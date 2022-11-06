import { useState } from 'react';

import OfferType from '../../types/offers';
import Offer from '../offer/offer';

type OffersListProps = {
  offers: Array<OfferType>;
}
function OffersList({ offers }: OffersListProps): JSX.Element {
  const activeOfferState = useState <OfferType>();
  const setActiveOffer = activeOfferState[1];

  const hoverHandler = (offer: OfferType) => {
    setActiveOffer(offer);
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

export default OffersList;
