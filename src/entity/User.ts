import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
