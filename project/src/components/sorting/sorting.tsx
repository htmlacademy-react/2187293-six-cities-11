import { useState } from 'react';
import SortTypes from '../../consts/sort-types';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { sort } from '../../store/offers-process/offers-process';
import { getCity, getOffers, getShowOffers } from '../../store/offers-process/selectors';

type SortingProps = {
  sortBy: string;
}

function Sorting({ sortBy }: SortingProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getShowOffers);
  const allOffers = useAppSelector(getOffers);
  const selectedCity = useAppSelector(getCity);

  const [isSelectorVisible, setSelectorVisibility] = useState(false);

  const showSelector = () => {
    setSelectorVisibility(!isSelectorVisible);
  };

  const changeSorting = (sortType: string) => {
    switch (sortType) {
      case SortTypes.Popular:
        dispatch(sort(allOffers.filter((o) => o.city.name === selectedCity)));
        break;
      case SortTypes.PriceHighToLow:
        dispatch(sort([...offers].sort( (a, b) => (b.price - a.price))));
        break;
      case SortTypes.PriceLowToHigh:
        dispatch(sort([...offers].sort( (a, b) => (a.price - b.price))));
        break;
      case SortTypes.TopRatedFirst:
        dispatch(sort([...offers].sort( (a, b) => (b.rating - a.rating))));
        break;
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={showSelector}>
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSelectorVisible ? 'places__options--opened' : ''}`}>
        <li
          onClick={() => changeSorting(SortTypes.Popular)}
          className="places__option places__option--active"
          tabIndex={0}
        >{SortTypes.Popular}
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={() => changeSorting(SortTypes.PriceLowToHigh)}
        >
          {SortTypes.PriceLowToHigh}
        </li>
        <li
          onClick={() => changeSorting(SortTypes.PriceHighToLow)}
          className="places__option"
          tabIndex={1}
        >{SortTypes.PriceHighToLow}
        </li>
        <li
          onClick={() => changeSorting(SortTypes.TopRatedFirst)}
          className="places__option"
          tabIndex={2}
        >{SortTypes.TopRatedFirst}
        </li>
      </ul>
    </form>
  );
}

export default Sorting;
