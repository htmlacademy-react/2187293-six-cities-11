import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import reviews from '../../mocks/reviews';
import OfferType from '../../types/offers';
import { getOffer, toggleFavorite, getNearPlaces } from '../../store/axios-actions';
import NotFoundScreen from '../404/not-found-screen';

function RoomScreen(): JSX.Element {
  const { offerId } = useParams();
  const [offer, setOffer] = useState<OfferType>();
  const [isIconFavorite, setIconFavorite] = useState(false);
  const [nearPlaces, setNearPlaces] = useState<OfferType[] | []>([]);

  useEffect(() => {
    if (offerId) {
      getOffer(offerId)
        .then((res) => {
          if (res) {
            setOffer(res);
            setIconFavorite(res.isFavorite);
          }
        });
      getNearPlaces(offerId)
        .then((res) => {
          if (res) {
            setNearPlaces(res);
          }
        });
    }
  }, [offerId]);

  if (offer) {
    const {
      bedrooms,
      description,
      goods,
      host,
      images,
      id,
      isPremium,
      maxAdults,
      price,
      rating,
      title,
      type,
    } = offer;

    const handleFavoriteClick = () => {
      setIconFavorite(!isIconFavorite);
      toggleFavorite(id, isIconFavorite ? 0 : 1);
    };

    return (
      <div className="page">
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  images.map((image: string, i: number) => {
                    const keyValue = `${i}-${image}`;
                    return (
                      <div className="property__image-wrapper" key={keyValue}>
                        <img className="property__image" src={image} key={keyValue} alt="studio" />);
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                { isPremium
                  ? (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  ) : null}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <button className={`${isIconFavorite ? 'property__bookmark-button--active' : 'property__bookmark-button'} button`} type="button" onClick={handleFavoriteClick}>
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      goods.map((good: string, i: number) => {
                        const keyValue = `${i}-${good}`;
                        return (
                          <li className="property__inside-item" key={keyValue}>
                            {good}
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    { host.isPro
                      ? (<span className="property__user-status">Pro</span>)
                      : null}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewList reviews={reviews} />
                  <CommentForm />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map city={nearPlaces[0].city} points={nearPlaces.map((nearPlace: OfferType) => nearPlace.location)} selectedPoint={undefined} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList offers={[nearPlaces[0], nearPlaces[1], nearPlaces[2]]} />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return (<NotFoundScreen />);
  }
}

export default RoomScreen;
