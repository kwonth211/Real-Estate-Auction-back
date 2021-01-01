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
  case_number?: string;

  @Column()
  item_number?: string;

  @Column()
  useage?: string;

  @Column()
  remark?: string;

  @Column()
  appraisal_value?: string;

  @Column()
  minimum_selling_price?: string;

  @Column()
  sale_date?: string;

  @Column()
  progress?: string;

  @OneToMany((type) => CourtLocation, (courtLocation) => courtLocation.court_id)
  location_list?: CourtLocation[];

  @OneToMany((type) => Land, (land) => land.court_id)
  land_list?: Land[];

  // @OneToMany((type) => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  // landList: Photo[];
}
