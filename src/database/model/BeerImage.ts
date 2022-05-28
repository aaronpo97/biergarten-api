import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Beer from './Beer';

@Entity()
export default class BeerImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  path!: string;

  @JoinColumn()
  @ManyToOne(() => Beer, (beer) => beer.images)
  beerPost!: Beer;
}
