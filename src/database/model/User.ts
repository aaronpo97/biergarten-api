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
  passwordSalt!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => Beer, (beer) => beer.postedBy)
  beerPosts!: Array<Beer>;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile!: Profile;
}
