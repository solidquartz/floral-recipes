import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: false })
  username: string;

  @Column("varchar", { nullable: false })
  password: string;
}
