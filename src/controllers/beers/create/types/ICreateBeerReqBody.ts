export default interface ICreateBeerReqBody {
  name: string;
  description: string;
  abv: number;
  ibu: number;
  breweryId: number;
}
