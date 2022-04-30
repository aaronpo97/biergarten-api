import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import Beer from './Beer';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  comment_body!: string;

  @Column()
  posted_date!: Date;

  @ManyToOne(() => Beer, (beer) => beer.comments)
  post!: Beer;
}
