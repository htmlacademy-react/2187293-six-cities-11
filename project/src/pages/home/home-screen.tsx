import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import OfferType from '../../types/offers';
import Location from '../../types/location';
import { useAppSelector } from '../../hooks/useAppSelector';
import cities from '../../consts/cities';
import City from '../../types/city';
import Sorting from '../../components/sorting/sorting';
import SortTypes from '../../consts/sort-types';
import { getCity, getShowOffers } from '../../store/offers-process/selectors';

function HomeScreen(): JSX.Element {
  const cityName = useAppSelector(getCity);
  const offers = useAppSelector(getShowOffers);
  const points = offers.map((offer: OfferType) => offer.location);
  const [selectedPoint, setSelectedPoint] = useState<Location | undefined>(undefined);
  let city = cities.find((c: City) => c.name === cityName);
  if (!city) {
    city = cities[0];
  }

  const changeMapMarkerClor = (id: number) => {
    let location;
    if (offers) {
      location = offers.find((o) => o.id === id)?.location;
      if (location) {
        setSelectedPoint(location);
      }
    }
  };

  return (
    <div>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <CitiesList active={cityName} />
          <div className="cities">
            {
              offers && offers.length
                ? (
                  <div className="cities__places-container container">
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">{offers.length} places to stay in {cityName}</b>
                      <Sorting sortBy={SortTypes.Popular} />
                      <div className="cities__places-list places__list tabs__content">
                        <OffersList offers={offers} changeMarkerColor={changeMapMarkerClor} />
                      </div>
                    </section>
                    <div className="cities__right-section">
                      <section className="cities__map map">
                        <Map city={city} points={points} selectedPoint={selectedPoint} />
                      </section>
                    </div>
                  </div>
                )
                : (
                  <div className="cities__places-container cities__places-container--empty container">
                    <section className="cities__no-places">
                      <div className="cities__status-wrapper tabs__content">
                        <b className="cities__status">No places to stay available</b>
                        <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
                      </div>
                    </section>
                    <div className="cities__right-section">
                    </div>
                  </div>
                )
            }
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomeScreen;
