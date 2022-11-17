import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import OfferType from '../../types/offers';
import Location from '../../types/location';
import { useAppSelector } from '../../hooks/useAppSelector';
import cities from '../../consts/cities';
import City from '../../types/city';

type HomeScreenProps = {
  variants: number;
};

function HomeScreen({ variants }: HomeScreenProps): JSX.Element {
  const cityName = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const points = offers.map((offer: OfferType) => offer.location);
  const [selectedPoint] = useState<Location | undefined>(undefined);
  let city = cities.find((c: City) => c.name === cityName);
  if (!city) {
    city = cities[0];
  }

  return (
    <div>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <CitiesList active={cityName} />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{variants} places to stay in {cityName}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <OffersList offers={offers} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={city} points={points} selectedPoint={selectedPoint} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomeScreen;
