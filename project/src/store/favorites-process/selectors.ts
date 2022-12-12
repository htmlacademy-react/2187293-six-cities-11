import NameSpace from '../../consts/name-space';
import { State } from '../../types/state';
import OffersType from '../../types/offers';


export const getFavorites = (state: State): OffersType[] => state[NameSpace.Favorites].favorites;
