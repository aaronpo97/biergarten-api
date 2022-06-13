import BeerImage from '../../database/model/BeerImage';
import BreweryImage from '../../database/model/BreweryImage';
import cloudinaryConfig from './cloudinaryConfig';

const { cloudinary } = cloudinaryConfig;

/** Helper function for deleting an image. Takes in either an instance of BeerImage or BreweryImage. */
const deleteImageHelper = async (image: BeerImage | BreweryImage) => {
  await image.remove();
  const { filename } = image;
  await cloudinary.uploader.destroy(filename);
};

export default deleteImageHelper;
