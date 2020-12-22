import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;
}
