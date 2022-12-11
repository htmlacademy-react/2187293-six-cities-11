import { Link } from 'react-router-dom';
import AppRoutes from '../../consts/app-routes';

import OfferType from '../../types/offers';
import FavoriteButton from '../favorite-button/favorite-button';

type FavouriteProps = {
  offer: OfferType;
}

function FavouriteOffer({ offer }: FavouriteProps): JSX.Element {
  const { price, title, type, rating, isPremium, id, isFavorite } = offer;

  return (
    <div className="favorites__places">
      <article className="favorites__card place-card">
        { isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <button>
            <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place" />
          </button>
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <FavoriteButton
              offerId={id}
              isFavorite={isFavorite}
              iconType='place-card'
              onToggle={null}
            />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${rating * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`${AppRoutes.offer}/${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </div>
  );
}

export default FavouriteOffer;
