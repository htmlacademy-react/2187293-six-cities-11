import { Link } from 'react-router-dom';
import FavoriteOffer from '../../components/favorite-offer/favorite-offer';
import AppRoutes from '../../consts/app-routes';
import OfferType from '../../types/offers';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getFavorites } from '../../store/favorites-process/selectors';

type CitiesNames = Array<string>;

function FavoriteScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);

  const list: CitiesNames = [];
  favorites.forEach((o: OfferType) => {
    if (!list.includes(o.city.name)) {
      list.push(o.city.name);
    }
  });

  const renderCities = (cities: string[]): JSX.Element[] => cities.map((city: string, index: number) => (
    <li className="favorites__locations-items" key={`${city}_${ index.toString()}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <button className="locations__item-link">
            <span>{city}</span>
          </button>
        </div>
        {
          favorites.filter((o) => o.city.name === city).map((offer) => (
            <FavoriteOffer key={offer.id} offer={offer} />
          ))
        }
      </div>
    </li>
  ));

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favorites && favorites.length
              ? (
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {renderCities(list)}
                  </ul>
                </section>
              )
              : (
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                  </div>
                </section>)
          }
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoutes.main} className='footer__logo-link'>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
export default FavoriteScreen;
