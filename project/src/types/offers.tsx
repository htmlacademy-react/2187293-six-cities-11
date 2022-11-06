import location from './location';

type offers = {
  bedrooms: number;
  city: {
    location: location;
    name: string;
  };
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
  location: location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export default offers;
