import { debug } from "console";
import puppeteer from "puppeteer";

const naverCrawling = async (page, data) => {
  //   const data = [];

  //   let { location, itemNumber } = data[6];
  //   let queryString = "";

  //   if (itemNumber.includes("아파트")) {
  //     const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  //     if (reg.test(location)) {
  //       location = location.replace(reg, "");
  //     }

  //     queryString =
  //       location.split(" ")[0] +
  //       location.split(" ")[1] +
  //       location.split(" ")[location.split(" ").length - 1];
  //   } else if (itemNumber.includes("상가오피스텔근린시설")) {
  //   } else if (itemNumber.includes("단독주택다가구")) {
  //   }
  await page.goto(
    `https://new.land.naver.com/search?sk=대전광역시대덕구목상동상록수아파트`
  );
  //
  //   await page.goto(`https://new.land.naver.com/search?sk=${queryString}`);
  page.waitForNavigation();
  //   const data = {};
  const listLength = await page.$$eval(
    `#articleListArea > div`,
    (data) => data.length
  );

  let Quote = 0;
  for (let i = 1; i <= listLength; i++) {
    const text = await page.$eval(
      `#articleListArea > div:nth-child(${i}) > div > a`,
      (data) => data.textContent
    );

    if (text.includes("매매")) {
      //법원 면적이 아니면 pass
      data.gubun = "매매";
      data.buildingNumber = text.split("아파트")[0].split("매매")[0];
      data.Quote += text.split("아파트")[0].split("매매")[1];
      data.area = text.split("아파트")[1].split(",")[0];
      data.floors = text.split("아파트")[1].split(",")[1];
      //   data.area = text.split("아파트")[1].split(",")[0];
    }
    debugger;
  }

  //   #articleListArea > div:nth-child(2) > div > a
  console.log(listLength);
};

export default naverCrawling;
