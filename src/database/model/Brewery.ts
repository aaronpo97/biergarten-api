import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Beer from './Beer';
import User from './User';

@Entity()
export default class Brewery extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  description!: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.breweryPosts)
  postedBy!: User;

  @OneToMany(() => Beer, (beer) => beer.brewery, { onDelete: 'CASCADE' })
  @JoinColumn()
  beers!: Array<Beer>;
}
