import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import BeerPost from './BeerPost';
import BreweryImage from './BreweryImage';
import BreweryReview from './BreweryReview';
import User from './User';

@Entity()
export default class BreweryPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  description!: string;

  @Column()
  createdAt!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  modifiedAt!: Date | null;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.breweryPosts)
  postedBy!: User;

  @JoinColumn()
  @OneToMany(() => BeerPost, (beer) => beer.brewery, { onDelete: 'CASCADE' })
  beers!: Array<BeerPost>;

  @OneToMany(() => BreweryReview, (breweryReview) => breweryReview.breweryPost)
  reviews!: Array<BreweryReview>;

  @JoinColumn()
  @OneToMany(() => BreweryImage, (breweryImage) => breweryImage.breweryPost)
  images!: Array<BreweryImage>;
}
