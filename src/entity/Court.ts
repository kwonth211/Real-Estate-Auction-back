import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { court, product, location } from "@/loaders/crawlingLoader";
@Entity()
export default class CourtList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caseNumber?: string;

  @Column()
  itemNumber?: string;

  @Column()
  usaAge?: string;

  @Column()
  locationList?: string;

  @Column()
  remark?: string;

  @Column()
  appraisalValue?: string;

  @Column()
  minimumSellingPrice?: [];

  @Column()
  saleDate?: string;

  @Column()
  progress?: string;

  @Column()
  productList?: Array<product>;
}
