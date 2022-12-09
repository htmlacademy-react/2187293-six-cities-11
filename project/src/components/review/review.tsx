import NotFoundScreen from '../../pages/404/not-found-screen';
import ReviewType from '../../types/review';

type ReviewPropsType = {
  review: ReviewType;
};

function Review({ review }: ReviewPropsType): JSX.Element {
  if (review) {
    const { user, comment, date, rating } = review;
    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">{user.name}</span>
          { user.isPro
            ? ( <span className="property__user-status">Pro</span>)
            : null}
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${rating * 20}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">{comment}</p>
          <time className="reviews__time" dateTime={date}></time>
        </div>
      </li>
    );
  }
  return (
    <NotFoundScreen />
  );

}

export default Review;
