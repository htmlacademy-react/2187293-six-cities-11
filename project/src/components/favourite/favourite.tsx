import { Link } from 'react-router-dom';

import OfferType from '../../types/offers';

type FavouriteProps = {
  offer: OfferType;
}

function Favourite({ offer }: FavouriteProps): JSX.Element {
  const { price, title, type, rating, isPremium, id } = offer;

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
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${rating * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer:${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </div>
  );
}

export default Favourite;
