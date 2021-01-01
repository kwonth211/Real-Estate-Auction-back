import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Court from "./Court";

@Entity()
export default class Land {
  @PrimaryGeneratedColumn()
  land_id: number;

  @Column()
  gubun?: string;

  @Column()
  building_number: string;

  @Column()
  quote: string;

  @Column()
  floors: string;

  @Column()
  area_type: string;

  @Column()
  area: string;

  @ManyToOne(() => Court, (court) => court.land_list, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "court_id", referencedColumnName: "court_id" })
  court_id: Court;
}
