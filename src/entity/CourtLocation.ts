import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import Court from "./Court";
@Entity()
export default class CourtLocation {
  @PrimaryGeneratedColumn()
  court_location_id: number;

  @Column()
  location?: string;

  @Column()
  area?: string;

  @ManyToOne(() => Court, (court) => court.locationList)
  court: Court;
}
