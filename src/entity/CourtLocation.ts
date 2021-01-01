import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Court, (court) => court.location_list, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "court_id", referencedColumnName: "court_id" })
  court_id: Court;
}
