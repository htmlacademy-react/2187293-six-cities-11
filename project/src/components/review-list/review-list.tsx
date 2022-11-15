import ReviewType from '../../types/review';
import Review from '../review/review';

type OffersListProps = {
  reviews: ReviewType[];
}
function ReviewList({ reviews }: OffersListProps): JSX.Element {
  return (
    <ul className='reviews__list'>
      {
        reviews.map((value: ReviewType, id: number) => {
          const keyValue = `${id}-${value.userName}`;
          return (
            <Review review={value} key={keyValue} />
          );
        })
      }
    </ul>);
}

export default ReviewList;
