import { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferType from '../../types/offers';
import AppRoutes from '../../consts/app-routes';
import { toggleFavorite } from '../../store/axios-actions';

type OfferPropsType = {
  offer: OfferType;
  mouseOverHandler: (offer: OfferType) => void;
};

function Card({ offer, mouseOverHandler }: OfferPropsType): JSX.Element {
  const {
    price,
    title,
    type,
    isPremium,
    rating,
    id,
    previewImage,
    isFavorite,
  } = offer;

  const [isIconFavorite, setIconFavorite] = useState<boolean>(isFavorite);

  const handleFavoriteClick = () => {
    setIconFavorite(!isIconFavorite);
    toggleFavorite(id, isIconFavorite ? 0 : 1);
  };

  return (
    <article className="cities__card place-card" onMouseOver={() => mouseOverHandler(offer)}>
      {isPremium
        ? (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
        : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <button>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"></img>
        </button>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isIconFavorite ? 'place-card__bookmark-button--active' : 'place-card__bookmark-button'} button`} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
    </article>);
}

export default Card;
