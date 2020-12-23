import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Court from "./Court";

@Entity()
export default class Land {
  @PrimaryGeneratedColumn()
  land_id: number;

  @Column()
  gubun?: string;

  @Column()
  buildingNumber: string;

  @Column()
  Quote: string;

  @Column()
  floors: string;

  @Column()
  areaType: string;

  @Column()
  area: string;

  @ManyToOne(() => Court, (court) => court.landList)
  court: Court;
}
