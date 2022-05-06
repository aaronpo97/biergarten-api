import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Beer from './Beer';
import Brewery from './Brewery';
import Profile from './Profile';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column({ type: 'date' })
  dateOfBirth!: string;

  @Column({ type: 'timestamp' })
  joinedDate!: Date;

  @Column()
  hash!: string;

  @JoinColumn()
  @OneToMany(() => Beer, (beer) => beer.postedBy)
  beerPosts!: Array<Beer>;

  @JoinColumn()
  @OneToMany(() => Brewery, (brewery) => brewery.postedBy)
  breweryPosts!: Array<Brewery>;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile!: Profile;
}
