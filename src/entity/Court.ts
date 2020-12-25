import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { CourtLocation, Land } from "@/entity/";
@Entity()
export default class Court {
  @PrimaryGeneratedColumn()
  court_id: number;

  @Column()
  caseNumber?: string;

  @Column()
  itemNumber?: string;

  @Column()
  useAge?: string;

  @Column()
  remark?: string;

  @Column()
  appraisalValue?: string;

  @Column()
  minimumSellingPrice?: string;

  @Column()
  saleDate?: string;

  @Column()
  progress?: string;

  @Column()
  location?: string;

  @OneToMany((type) => CourtLocation, (courtLocation) => courtLocation.court)
  locationList?: CourtLocation[];

  @OneToMany((type) => Land, (land) => land.court)
  landList?: Land[];

  // @OneToMany((type) => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  // landList: Photo[];
}
