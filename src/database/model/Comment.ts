import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import Beer from './Beer';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  commentBody!: string;

  @Column()
  postedDate!: Date;

  @ManyToOne(() => Beer, (beer) => beer.comments)
  post!: Beer;
}
