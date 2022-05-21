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
export default class BeerComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  commentBody!: string;

  @Column()
  rating!: number;

  @Column()
  postedDate!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  editedDate!: Date;

  @ManyToOne(() => Beer, (beer) => beer.comments)
  @JoinColumn()
  beerPost!: Beer;

  @ManyToOne(() => User, (user) => user.beerComments)
  @JoinColumn()
  postedBy!: User;
}
