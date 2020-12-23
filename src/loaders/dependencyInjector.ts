import "reflect-metadata";
import { createConnection, useContainer, Connection } from "typeorm";
import { Container } from "typedi";
import {
  LandRepository,
  CourtRepository,
  CourtLocationRepository,
} from "../repository";
import { User, Court, Land, CourtLocation } from "@/entity";

const dependencyInjector = async (crawlingDataList: any = false) => {
  useContainer(Container);
  createConnection()
    .then(async (connection) => {
      if (!crawlingDataList) {
        return;
      }

      const courtRepository = Container.get(CourtRepository);
      const courtLocationRepository = Container.get(CourtLocationRepository);
      const landRepository = Container.get(LandRepository);
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
        courtSchema.appraisalValue = appraisalValue;
        courtSchema.caseNumber = caseNumber;
        courtSchema.itemNumber = itemNumber;
        courtSchema.minimumSellingPrice = minimumSellingPrice;
        courtSchema.remark = remark;
        courtSchema.saleDate = saleDate;
        courtSchema.progress = progress;
        await courtRepository.saveUsingManager(courtSchema);
        // await connection.manager.save(courtSchema);
        for (const { location, area } of locationList) {
          const courtLocationSchema = new CourtLocation();
          courtLocationSchema.court = courtSchema;
          courtLocationSchema.location = location;
          courtLocationSchema.area = area;
          await courtLocationRepository.saveUsingManager(courtLocationSchema);
          // await connection.manager.save(courtLocationSchema);
        }
        for (const land of landList) {
          const { gubun, buildingNumber, Quote, floors, areaType, area } = land;
          const landSchema = new Land();
          landSchema.court = courtSchema;
          landSchema.gubun = gubun;
          landSchema.buildingNumber = buildingNumber;
          landSchema.Quote = Quote;
          landSchema.floors = floors;
          landSchema.areaType = areaType;
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
