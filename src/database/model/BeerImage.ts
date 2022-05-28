import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Beer from './Beer';
import User from './User';

@Entity()
export default class BeerImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  path!: string;

  @JoinColumn()
  @ManyToOne(() => Beer, (beer) => beer.images)
  beerPost!: Beer;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.beerImages)
  author!: User;
}
