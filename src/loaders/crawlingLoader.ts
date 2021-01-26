import courtCrawling from "@/crawling/court";
import naverCrawling from "@/crawling/naver";
import puppeteer from "puppeteer";
import { Container } from "typedi";
import { CourtRepository, LandRepository } from "@/repository";
export interface court {
  caseNumber?: string;
  itemNumber?: string;
  useAge?: string;
  remark?: string;
  appraisalValue?: string;
  minimumSellingPrice?: string;
  saleDate?: string;
  progress?: string;
  locationList?: Array<location>;
  landList?: Array<land>;
}

export interface location {
  location?: string;
  area?: string;
}

export interface land {
  gubun?: string;
  buildingNumber?: string;
  quote?: string;
  floors?: string;
  areaType?: string;
  area?: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  name: string;
  password: string;
}

const crawlingLoader = async () => {
  console.log("== 크롤링 시작 ==");

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const data = await courtCrawling(page);

  const naverData = await naverCrawling(page, data);

  return naverData;
};

export default crawlingLoader;
