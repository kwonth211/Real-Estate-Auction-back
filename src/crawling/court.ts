import puppeteer from "puppeteer";
import { court, location } from "./../loaders/crawlingLoader";
let totalCount = 0;

const courtCrawling = async (page) => {
  const courtList: Array<court> = [];

  await page.goto(`http://www.courtauction.go.kr/RetrieveMainInfo.laf`);

  page.waitForNavigation();
  page.click("#qk_srch_link_1 > a");

  await page.waitForNavigation();

  await page.select("select#idJiwonNm", "대전지방법원");

  await Promise.all([
    page.click("#contents > form > div.tbl_btn > a:nth-child(1)"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  const pageNumber = await page.$$eval(
    `#contents > div.table_contents > form:nth-child(2) > div > div.page2 > a`,
    (data) => data.length
  );

  // 페이지 진입 1페이지 시작

  for (let i = 1; i <= pageNumber; i++) {
    const pageNo = i <= 2 ? i : i + 1;
    if (i !== 1) {
      await Promise.all([
        page.click(
          `#contents > div.table_contents > form:nth-child(2) > div > div.page2 > a:nth-child(${pageNo})`
        ),

        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }

    const number = await page.$$eval(
      "#contents > div.table_contents > form:nth-child(1) > table > tbody > tr",
      (data) => data.length
    );
    for (let index = 0; index < number; index++) {
      const court = await getTr(page, index + 1);
      if (Object.keys(court).length) {
        courtList.push(court);
      }
    }
  }

  return courtList;
};

const getTr = async (page, index) => {
  let court: court = {};
  const caseNumberText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(2) > a`,
    (data) => data?.textContent
  );

  const itemNumberText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`,
    (data) => data?.textContent
  );

  const remarkText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(5)`,
    (data) => data?.textContent
  );

  const appraisalValueText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td.txtright > div.tbl_btm_noline`,
    (data) => data?.textContent
  );

  const minimumSellingPriceText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td.txtright > div.tbl_btm_line`,
    (data) => data?.textContent
  );

  const saleDateText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(7) > div.tbl_btm_noline`,
    (data) => data?.textContent
  );

  const progressText = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(7) > div.tbl_btm_line`,
    (data) => data?.textContent
  );

  //사건번호
  const caseNumber = decodingText(caseNumberText);
  //물건번호
  const itemNumber = decodingText(itemNumberText).substr(0, 1);
  //용도
  const useAge = decodingText(itemNumberText).substr(1);
  //비고
  const remark = decodingText(remarkText);
  //감정평가액
  const appraisalValue = decodingText(appraisalValueText);
  //최저매각가격
  const minimumSellingPrice = decodingText(minimumSellingPriceText);
  //담당계 / 매각기일(입찰기간)
  const saleDate = decodingText(saleDateText);
  //진행상태
  const progress = decodingText(progressText);

  court = {
    caseNumber,
    itemNumber,
    useAge,
    remark,
    appraisalValue,
    minimumSellingPrice,
    saleDate,
    progress,
  };
  switch (useAge) {
    case "아파트":
      break;
    case "자동차":
    default:
      return Promise.resolve({});
  }

  //소재지 | 내역  for 문 돌려야함
  const tdLength = await page.$$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(4) > div`,
    (data) => data.length
  );
  //소재지
  const locationList: Array<location> = [];
  // console.log(`법원 소재지 갯수 :`, tdLength);
  for (let i = 1; i <= tdLength; i++) {
    totalCount++;
    const temp = await page.$eval(
      `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(4) > div:nth-child(${i})`,
      (data) => data?.textContent
    );
    const areaText = decodingText(temp).split("[")[1].split("]")[0];
    const location = decodingText(temp).split("[")[0];
    const area = areaText.replace(/[^0-9㎡.]/g, "").split("㎡")[0]; //보일라실 제외
    locationList.push({
      location,
      area,
    });
  }
  court.locationList = locationList;

  return Promise.resolve(court);
};

const decodingText = (text) => {
  if (!text) {
    console.error("text is not exist!");
    return;
  }
  return text.replace(/\n/g, "").replace(/\t/g, "");
};

export default courtCrawling;
