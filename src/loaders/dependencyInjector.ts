import "reflect-metadata";
import { createConnection, useContainer, Connection } from "typeorm";
import { Container } from "typedi";
import {
  LandRepository,
  CourtRepository,
  CourtLocationRepository,
} from "../repository";
import { User, Court, Land, CourtLocation } from "@/entity";
import crawlingLoader from "./crawlingLoader";

const dependencyInjector = async ({ crawling }) => {
  useContainer(Container);
  return createConnection()
    .then(async (connection) => {
      if (!crawling) {
        return;
      }

      const courtRepository = Container.get(CourtRepository);
      const courtLocationRepository = Container.get(CourtLocationRepository);
      const landRepository = Container.get(LandRepository);

      await courtRepository.delete({});
      console.log("==데이터 삭제 완료==");

      const crawlingDataList = await crawlingLoader();

      for (const courtData of crawlingDataList) {
        const {
          appraisalValue,
          caseNumber,
          itemNumber,
          minimumSellingPrice,
          remark,
          saleDate,
          progress,
          landList,
          locationList,
        } = courtData;
        if (!locationList || !landList) {
          console.log("매물이 없습니다.");
          continue;
        }
        const courtSchema = new Court();
        courtSchema.appraisal_value = appraisalValue;
        courtSchema.case_number = caseNumber;
        courtSchema.item_number = itemNumber;
        courtSchema.minimum_selling_price = minimumSellingPrice;
        courtSchema.remark = remark;
        courtSchema.sale_date = saleDate;
        courtSchema.progress = progress;
        await courtRepository.saveUsingManager(courtSchema);
        // await connection.manager.save(courtSchema);
        for (const { location, area } of locationList) {
          const courtLocationSchema = new CourtLocation();
          courtLocationSchema.court_id = courtSchema;
          courtLocationSchema.location = location;
          courtLocationSchema.area = area;
          await courtLocationRepository.saveUsingManager(courtLocationSchema);
          // await connection.manager.save(courtLocationSchema);
        }
        for (const land of landList) {
          const { gubun, buildingNumber, quote, floors, areaType, area } = land;
          const landSchema = new Land();
          landSchema.court_id = courtSchema;
          landSchema.gubun = gubun;
          landSchema.building_number = buildingNumber;
          landSchema.quote = quote;
          landSchema.floors = floors;
          landSchema.area_type = areaType;
          landSchema.area = area;
          landSchema.floors = floors;
          await landRepository.saveUsingManager(landSchema);
          // await connection.manager.save(landSchema);
        }
        // const userRepository = connection.getRepository(Court);
        // const users = await userRepository.find();
        // console.log("court" + users);
        // const photoRepository = connection.getRepository(CourtLocation);
        // const photos = await photoRepository.find({ relations: ["court"] });
        // console.log(photos);
        // const landRepository = connection.getRepository(Land);
        // const lands = await landRepository.find({ relations: ["court"] });
        // console.log(lands);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
export default dependencyInjector;
