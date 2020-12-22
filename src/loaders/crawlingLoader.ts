import courtCrawling from "@/crawling/court";
import naverCrawling from "@/crawling/naver";
import puppeteer from "puppeteer";

export interface court {
  caseNumber?: string;
  itemNumber?: string;
  usaAge?: string;
  locationList?: Array<location>;
  remark?: string;
  appraisalValue?: string;
  minimumSellingPrice?: string;
  saleDate?: string;
  progress?: string;
  productList?: Array<product>;
}

export interface location {
  location?: string;
  area?: string;
}

export interface product {
  gubun?: string;
  buildingNumber?: string;
  Quote?: string;
  floors?: string;
  areaType?: string;
  area?: string;
}

const crawlingLoader = async () => {
  console.log("크롤링 시작 !");

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const data = await courtCrawling(page);

  const naverData = await naverCrawling(page, data);

  console.log(naverData);
};

export default crawlingLoader;
