import Location from './location';
import City from './city';

type offers = {
  bedrooms: number;
  city: City;
  description: string;
  goods: Array<string>;
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: Array<string>;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export default offers;
