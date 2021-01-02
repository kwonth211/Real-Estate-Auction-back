import { debug } from "console";
import puppeteer from "puppeteer";
import { court, land } from "./../loaders/crawlingLoader";

const ERROR_RANGE = 2 as const;

const naverCrawling = async (page, courtList: Array<court>) => {
  for (let [index, court] of courtList.entries()) {
    let { locationList } = court;

    locationList.forEach(({ location, area }) => {
      // 법원 매물이 여러개 있을때를 생각해 봐야함.
      // console.log(location);
      // console.log(area);
    });

    const { location } = locationList[0];
    const district = location.substr(0, location.indexOf("구") + 1);
    const addressDetail = location
      .split("(")[1]
      ?.substring(0, location.split("(")[1].length - 1)
      ?.replace(",", " ");

    if (!district || !addressDetail) {
      continue;
    }
    const queryString = `${district} ${addressDetail} `;

    try {
      //검색해서 안나오면 재낌.
      await page.goto(`https://new.land.naver.com/search?sk=${queryString}`);

      await waitForSeconds();
    } catch (e) {
      console.log(e);
    }

    const listLength = await page.$$eval(
      `#articleListArea > div`,
      (data) => data.length
    );
    // 동일이름 매물2개 이상 나올때는 생각해봐야함
    console.log(`네이버 > ${queryString} 매물 갯수 :  ` + listLength);

    if (listLength !== 0) {
      //시세 실거래가 get

      await actualTransaction(page, locationList[0].area);
    }

    const productList = [];
    for (let i = 1; i <= listLength; i++) {
      const text = await page.$eval(
        `#articleListArea > div:nth-child(${i}) > div > a`,
        (data) => data.textContent
      );
      const product: land = {};

      if (!text) {
        continue;
      }
      const productAreaText = text.split("아파트")[1].split(",")[0];

      const area = productAreaText.split("/")[1];
      //Todo 법원 매물과 동일한 면적인지 검사 +- 0.5
      if (!productValidateCheck(locationList[0].area, area)) {
        continue;
      }

      const areaType = productAreaText.split("/")[0];

      product.gubun = "매매";
      product.buildingNumber = text.split("아파트")[0].split("매매")[0];
      product.quote = text.split("아파트")[0].split("매매")[1];
      product.floors = text.split("아파트")[1].split(",")[1];
      product.areaType = areaType;
      product.area = area;
      productList.push(product);
      courtList[index].landList = productList;
    }
  }

  return courtList;
};

const productValidateCheck = (courtArea: string, landArea: string) => {
  let validate = true;
  if (
    !(
      Number(courtArea) - ERROR_RANGE <= Number(landArea.split("m²")[0]) &&
      Number(landArea.split("m²")[0]) <= Number(courtArea) + ERROR_RANGE
    )
  ) {
    // console.log(
    //   `매물 걸러짐 법원면적 : ${courtArea} , 매물면적: ${
    //     landArea.split("m²")[0]
    //   }`
    // );
    validate = false;
  }

  return validate;
};

const waitForSeconds = async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 2000);
  });
};

const actualTransaction = async (page: any, courtArea: string) => {
  return new Promise(async (resolve, reject) => {
    await Promise.all([
      page.click(
        "#summaryInfo > div.complex_summary_info > div.complex_detail_link > button:nth-child(2)"
      ),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    const listLength = await page.$$eval(`#area_tab_list > a`, (e) =>
      e.map((e) => e.textContent)
    );

    const findIndex = listLength.findIndex((area) => {
      console.log(courtArea, onlyNumber(area));
      if (productValidateCheck(courtArea, onlyNumber(area))) {
        return true;
      }
    });
    return resolve(listLength);
  });
};

const onlyNumber = (str) => {
  var reg = /[a-zA-Z㎡]+/g;
  if (reg.test(str)) {
    return str.replace(reg, "");
  } else {
    return str;
  }
};
export default naverCrawling;
