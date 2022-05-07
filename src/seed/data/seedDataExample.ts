import { IRawBreweryData } from './types';

const exampleBrewery: IRawBreweryData = {
  name: 'Lorem Ipsum Brewing Company',
  description: 'Unde voluptatibus id mollitia dolor quia earum voluptatem cupiditate.',
  location: '14698 White Meadows, Seattle, Washington, United States',
  beers: [
    {
      name: 'Consequuntur Hic Porter',
      type: 'Porter',
      description: 'Consequatur omnis voluptatem iure velit et ea veniam.',
      abv: 5,
      ibu: 26,
    },
    {
      name: 'Odio Dolorem Stout',
      type: 'Stout',
      description: 'Ipsam vel labore qui sed numquam unde at ullam provident.',
      abv: 6.4,
      ibu: 31,
    },
  ],
};

const seedData: Array<IRawBreweryData> = [exampleBrewery];

export default seedData;
