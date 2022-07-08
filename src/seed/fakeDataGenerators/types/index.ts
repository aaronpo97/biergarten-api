export interface RawBeerData {
  name: string;
  typeId: string;
  description: string;
  abv?: number;
  ibu?: number;
}
export interface RawBreweryData {
  name: string;
  description: string;
  location: string;
  phone_number: string;
}
export interface RawFakeUserData {
  username: string;
  email: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
}
