const getBeerPostSortingMethod = (sortingParam?: "type" | "name" | "abv" | "ibu") => {
     switch (sortingParam) {
       case 'abv':
         return 'beer.abv';
       case 'ibu':
         return 'beer.ibu';
       case 'name':
         return 'beer.name';
       case 'type':
         return 'beerType.name';
       default:
         return 'beerPost.id';
     }
   };

   export default getBeerPostSortingMethod