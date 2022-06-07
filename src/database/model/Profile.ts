import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import BeerPost from './BeerPost';
import User from './User';

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  aboutMe!: string;

  @ManyToMany(() => BeerPost, (beer) => beer.likedBy)
  @JoinColumn()
  likes!: Array<BeerPost>;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user!: User;
}
