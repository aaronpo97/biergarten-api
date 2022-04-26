import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
   @PrimaryGeneratedColumn() id!: number;
   @Column() username!: string;
   @Column() email!: string;
   @Column() date_of_birth!: Date;
}
