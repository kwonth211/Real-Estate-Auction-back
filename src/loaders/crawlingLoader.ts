import courtCrawling from "@/crawling/court";
import naverCrawling from "@/crawling/naver";
import puppeteer from "puppeteer";

export interface auction {
  caseNumber?: string;
  itemNumber?: string;
  location?: string;
  area?: string;
  remark?: string;
  appraisalValue?: string;
  minimumSellingPrice?: string;
  saleDate?: string;
  progress?: string;
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

  // const data = await courtCrawling(page);
  const data = [];

  const naverData = await naverCrawling(page, data);

  console.log(data);
};

export default crawlingLoader;
