import { debug } from "console";
import puppeteer from "puppeteer";
import { court, land } from "./../loaders/crawlingLoader";

const naverCrawling = async (page, courtList: Array<court>) => {
  for (let [index, court] of courtList.entries()) {
    let { locationList } = court;

    locationList.forEach(({ location, area }) => {
      // 법원 매물이 여러개 있을때를 생각해 봐야함.
      // console.log(location);
      // console.log(area);
    });

    const { location } = locationList[0];
    const queryString = location.split("(")[1]?.split("아파트")[0];

    if (!queryString) {
      continue;
    }
    try {
      //검색해서 안나오면 재낌.
      await page.goto(`https://new.land.naver.com/search?sk=${queryString}`);
      // await page.waitForNavigation({ waitUntil: "networkidle2" });

      await waitForSeconds();
    } catch (e) {
      console.log(e);
    }

    const listLength = await page.$$eval(
      `#articleListArea > div`,
      (data) => data.length
    );
    console.log(`네이버 > ${queryString} 매물 갯수 :  ` + listLength);

    let Quote = 0;
    const productList = [];
    for (let i = 1; i <= listLength; i++) {
      const text = await page.$eval(
        `#articleListArea > div:nth-child(${i}) > div > a`,
        (data) => data.textContent
      );
      if (text.includes("매매")) {
        //Todo 법원 매물과 동일한 면적인지 봐야함
        const product: land = {};

        const productAreaText = text.split("아파트")[1].split(",")[0];
        const areaType = productAreaText.split("/")[0];
        const area = productAreaText.split("/")[1];

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
  }

  return courtList;
};

const waitForSeconds = async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, 2000);
  });
};

export default naverCrawling;
