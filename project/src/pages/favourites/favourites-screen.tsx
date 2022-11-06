import { Link } from 'react-router-dom';
import Favourite from '../../components/favourite/favourite';
import AppRoutes from '../../consts/app-routes';
import OfferType from '../../types/offers';

type FavouritesProps = {
  offers: Array<OfferType>;
};

type CitiesNames = Array<string>;

function FavouritesScreen({ offers }: FavouritesProps): JSX.Element {

  const list: CitiesNames = [];
  offers.forEach((o: OfferType) => {
    if (!list.includes(o.city.name)) {
      list.push(o.city.name);
    }
  });

  const renderCities = (cities: string[]): JSX.Element[] => cities.map((city: string, index: number) => (
    <li className="favorites__locations-items" key={`${city }_${ index.toString()}`}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <button className="locations__item-link">
            <span>{city}</span>
          </button>
        </div>
        {
          offers.filter((o) => o.city.name === city).map((offer) => (
            <Favourite key={offer.id} offer={offer} />
          ))
        }
      </div>
    </li>
  ));

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {renderCities(list)}
            </ul>
          </section>
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
export default FavouritesScreen;
