import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Beer from './Beer';
import Profile from './Profile';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  joinedDate!: Date;

  @OneToMany(() => Beer, (beer) => beer.postedBy)
  beerPosts!: Array<Beer>;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile;
}
