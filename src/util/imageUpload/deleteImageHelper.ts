import BeerImage from '../../database/model/BeerImage';
import BreweryImage from '../../database/model/BreweryImage';
import cloudinaryConfig from './cloudinaryConfig';

const { cloudinary } = cloudinaryConfig;

/**
 * Helper function for deleting an image.
 *
 * @param image The beer image or brewery image you wish to delete.
 */
const deleteImageHelper = async (image: BeerImage | BreweryImage) => {
  await image.remove();
  const { filename } = image;
  await cloudinary.uploader.destroy(filename);
};

export default deleteImageHelper;
