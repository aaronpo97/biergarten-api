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
import BreweryImage from './BreweryImage';
import BreweryReview from './BreweryReview';
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

  @JoinColumn()
  @OneToMany(() => Beer, (beer) => beer.brewery, { onDelete: 'CASCADE' })
  beers!: Array<Beer>;

  @OneToMany(() => BreweryReview, (breweryReview) => breweryReview.breweryPost)
  reviews!: Array<BreweryReview>;  

  @JoinColumn()
  @OneToMany(() => BreweryImage, (breweryImage) => breweryImage.breweryPost)
  images!: Array<BreweryImage>;
}
