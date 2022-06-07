import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import BeerPost from './BeerPost';
import BeerComment from './BeerComment';
import BeerImage from './BeerImage';
import BreweryPost from './BreweryPost';
import BreweryImage from './BreweryImage';
import BreweryReview from './BreweryReview';
import Profile from './Profile';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  accountConfirmed!: boolean;

  @Column({ type: 'date' })
  dateOfBirth!: string;

  @Column({ type: 'timestamp' })
  joinedDate!: Date;

  @Column()
  hash!: string;

  @JoinColumn()
  @OneToMany(() => BeerPost, (beer) => beer.postedBy)
  beerPosts!: Array<BeerPost>;

  @JoinColumn()
  @OneToMany(() => BreweryPost, (brewery) => brewery.postedBy)
  breweryPosts!: Array<BreweryPost>;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile!: Profile;

  @JoinColumn()
  @OneToMany(() => BeerImage, (beerImage) => beerImage.author)
  beerImages!: Array<BeerImage>;

  @JoinColumn()
  @OneToMany(() => BreweryImage, (breweryImage) => breweryImage.postedBy)
  breweryImages!: Array<BreweryImage>;

  @JoinColumn()
  @OneToMany(() => BeerComment, (beerComment) => beerComment.postedBy)
  beerComments!: Array<BeerComment>;

  @JoinColumn()
  @OneToMany(() => BreweryReview, (breweryReview) => breweryReview.postedBy)
  breweryReviews!: Array<BreweryReview>;
}
