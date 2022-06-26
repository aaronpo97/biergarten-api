export interface IRawBeerData {
  name: string;
  type: string;
  description: string;
  abv?: number;
  ibu?: number;
}
export interface IRawBreweryData {
  name: string;
  description: string;
  location: string;
  beers: readonly IRawBeerData[];
  phone_number: string;
}
export interface IRawFakeUserData {
  username: string;
  email: string;
  dateOfBirth: string;
}
