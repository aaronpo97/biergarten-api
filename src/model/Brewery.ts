import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import Beer from './Beer';

@Entity()
export default class Brewery extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column() name!: string;

  @Column() location!: string;

  @Column() description!: string;

  @OneToMany(() => Beer, (beer) => beer.brewery) beers!: Beer[];
}
