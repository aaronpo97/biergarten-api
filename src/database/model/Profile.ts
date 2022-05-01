import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  about_me!: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user!: User;
}
