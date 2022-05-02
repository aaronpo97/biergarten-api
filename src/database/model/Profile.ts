import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import Beer from './Beer';
import User from './User';

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  aboutMe!: string;

  @ManyToMany(() => Beer, (beer) => beer.likedBy)
  @JoinColumn()
  likes!: Array<Beer>;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user!: User;
}
