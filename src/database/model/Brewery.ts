import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, JoinColumn } from 'typeorm';
import Beer from './Beer';

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

  @OneToMany(() => Beer, (beer) => beer.brewery, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  beers!: Array<Beer>;
}
