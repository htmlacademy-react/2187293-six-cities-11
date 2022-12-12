import { useState, memo } from 'react';

import OfferType from '../../types/offers';
import Offer from '../offer/offer';

type OffersListProps = {
  offers: Array<OfferType>;
  changeMarkerColor: ((id: number) => void) | undefined;
}
function OffersList({ offers, changeMarkerColor }: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState <OfferType>();

  const hoverHandler = (offer: OfferType) => {
    setActiveOffer(offer);
    if (changeMarkerColor) {
      changeMarkerColor(offer.id);
    }
  };

  return (
    <>
      {
        offers.map((value: OfferType, id: number) => {
          const keyValue = `${id}-${value.id}`;
          return (
            <Offer offer={value} key={keyValue} mouseOverHandler={hoverHandler} />
          );
        })
      }
    </>);
}

export default memo(OffersList);
