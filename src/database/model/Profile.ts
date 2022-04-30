import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import User from './User';

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  about_me!: string;

  @OneToOne(() => User, (user) => user.profile)
  user!: User;
}
