import NameSpace from '../../consts/name-space';
import { State } from '../../types/state';
import OffersType from '../../types/offers';


export const getOffers = (state: State): OffersType[] => state[NameSpace.Offers].offers;
export const getShowOffers = (state: State): OffersType[] => state[NameSpace.Offers].showOffers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getIsLoading = (state: State): boolean => state[NameSpace.Offers].isLoading;
