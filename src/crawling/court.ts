import puppeteer from "puppeteer";
import { auction } from "./../loaders/crawlingLoader";

let totalCount = 0;
const lawData = [
  "서울동부지방법원",
  "서울서부지방법원",
  "서울남부지방법원",
  "서울북부지방법원",
  "의정부지방법원",
  "고양지원",
  "인천지방법원",
  "부천지원",
  "수원지방법원",
  "성남지원",
  "여주지원",
  "평택지원",
  "안산지원",
  "안양지원",
  "춘천지방법원",
  "강릉지원",
  "원주지원",
  "속초지원",
  "영월지원",
  "청주지방법원",
  "충주지원",
  "제천지원",
  "영동지원",
  "대전지방법원",
  "홍성지원",
  "논산지원",
  "천안지원",
  "공주지원",
  "서산지원",
  "대구지방법원",
  "안동지원",
  "경주지원",
  "김천지원",
  "상주지원",
  "의성지원",
  "영덕지원",
  "포항지원",
  "대구서부지원",
  "부산지방법원",
  "부산동부지원",
  "부산서부지원",
  "울산지방법원",
  "창원지방법원",
  "마산지원",
  "진주지원",
  "통영지원",
  "밀양지원",
  "거창지원",
  "광주지방법원",
  "목포지원",
  "장흥지원",
  "순천지원",
  "해남지원",
  "전주지방법원",
  "군산지원",
  "정읍지원",
  "남원지원",
  "제주지방법원",
  "전체",
];
const courtCrawling = async (page) => {
  const data = [];

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
      data.push(await getTr(page, index + 1));
    }
  }

  return data;
};

const getTr = async (page, index) => {
  const auction: auction = {};
  //사건번호
  auction.caseNumber = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(2) > a`,
    (data) => data?.textContent
  );

  //물건번호 | 용도
  auction.itemNumber = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`,
    (data) => data?.textContent
  );
  //소재지 | 내역  for 문 돌려야함
  const tdLength = await page.$$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(4) > div`,
    (data) => data.length
  );
  //소재지
  for (let i = 1; i <= tdLength; i++) {
    totalCount++;
    const temp = await page.$eval(
      `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(4) > div:nth-child(${i})`,
      (data) => data?.textContent
    );

    auction.location = temp.replace(/\n/g, "").replace(/\t/g, "").split("[")[0];
    auction.area = temp
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .split("[")[1]
      .split("]")[0];
  }

  //비고
  auction.remark = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(5)`,
    (data) => data?.textContent
  );
  // console.log(Remark);

  //감정평가액
  auction.appraisalValue = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td.txtright > div.tbl_btm_noline`,
    (data) => data?.textContent
  );
  // console.log(appraisalValue);

  //최저매각가격
  auction.minimumSellingPrice = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td.txtright > div.tbl_btm_line`,
    (data) => data?.textContent
  );

  // console.log(minimumSellingPrice);

  //담당계 / 매각기일(입찰기간)
  auction.saleDate = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(7) > div.tbl_btm_noline`,
    (data) => data?.textContent
  );
  // console.log(saleDate);

  //진행상태
  auction.progress = await page.$eval(
    `#contents > div.table_contents > form:nth-child(1) > table > tbody > tr:nth-child(${index}) > td:nth-child(7) > div.tbl_btm_line`,
    (data) => data?.textContent
  );

  Object.entries(auction).forEach((item, i) => {
    auction[item[0]] = item[1].replace(/\n/g, "").replace(/\t/g, "");
  });

  return Promise.resolve(auction);
};

export default courtCrawling;
