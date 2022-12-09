import ReviewType from '../../types/review';
import Review from '../review/review';

type OffersListProps = {
  reviews: ReviewType[];
}
function ReviewList({ reviews }: OffersListProps): JSX.Element {
  if (reviews && reviews.length > 0) {
    return (
      <ul className='reviews__list'>
        {
          reviews.map((value: ReviewType, id: number) => {
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

export default ReviewList;
