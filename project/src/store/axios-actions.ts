import { api } from './index';
import apiRoutes from '../consts/api-routes';
import OfferType from '../types/offers';
import CommentType from '../types/review';

export const getOffer = async (id: string) => {
  const { data } = await api.get<OfferType>(`${apiRoutes.Offers}/${id}`);
  return data;
};

export const toggleFavorite = async (offerId: number, status: number) => {
  const path = `${apiRoutes.Favorite}/${offerId}/${status}`;
  const { data } = await api.post<OfferType>(path);
  return data;
};

export const getNearPlaces = async (offerId: string) => {
  const path = `${apiRoutes.Offers}/${offerId}/nearby`;
  const { data } = await api.get<OfferType[]>(path);
  return data;
};

export const getCommentsList = async (offerId: string) => {
  const path = `${apiRoutes.Comments}/${offerId}`;
  const { data } = await api.get<CommentType[]>(path);
  return data;
};

export const postComment = async (offerId: string, comment: string, rating: number) => {
  const path = `${apiRoutes.Comments}/${offerId}`;
  const { data } = await api.post<CommentType[]>(path, { comment, rating });
  return data;
};
