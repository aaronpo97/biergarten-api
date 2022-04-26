import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import Brewery from './Brewery';

@Entity()
export default class Beer extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column() name!: string;

  @Column() description!: string;

  @Column() abv!: number;

  @Column() ibu!: number;

  @ManyToOne(() => Brewery, (brewery) => brewery.beers) brewery!: Brewery;
}
