import { memo } from 'react';
import ReviewType from '../../types/review';
import Review from '../review/review';

type OffersListProps = {
  reviews: ReviewType[];
}
function ReviewList({ reviews }: OffersListProps): JSX.Element {
  if (reviews && reviews.length > 0) {
    const sorted = reviews.sort((r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime());
    const data = reviews.length > 10
      ? sorted.slice(0, 10)
      : sorted;
    return (
      <ul className='reviews__list'>
        {
          data.map((value: ReviewType, id: number) => {
            const keyValue = `${id}-${value.user.name}`;
            return (
              <Review review={value} key={keyValue} />
            );
          })
        }
      </ul>);
  }
  return (
    <h1>No comments yet</h1>
  );
}

export default memo(ReviewList);
