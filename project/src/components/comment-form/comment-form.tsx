import { ChangeEvent, FormEvent, useState } from 'react';
import { postComment } from '../../store/axios-actions';
import CommentType from '../../types/review';

type CommentFormProps = {
  handleSubmitResult: (comments: CommentType[]) => void;
  id: string;
}
function CommentForm({ handleSubmitResult, id }: CommentFormProps): JSX.Element {
  const initCommentState = {
    rating: 0,
    review: '',
  };
  const [comment, setComment] = useState(initCommentState);
  const [isDisabled, setDisabled] = useState(true);
  const [hasError, setError] = useState(false);

  const submitHandler = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setComment({ ...comment, [name]: value});
    if (comment.rating && comment.review.length >= 50 && comment.review.length <= 300) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setDisabled(true);
    postComment(id, comment.review, comment.rating)
      .then((res) => {
        const sorted = res.sort((r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime());
        handleSubmitResult(sorted);
        setComment(initCommentState);
        const stars = document.getElementsByName('rating') as NodeListOf<HTMLInputElement>;
        if (stars) {
          for (let i = 0; i < stars.length; i++) {
            stars[i].checked = false;
          }
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <form className="reviews__form form" action="" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      { hasError ? <h2 className='reviews__title'>An error occured while sending your comment</h2> : null}
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" onChange={submitHandler} name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={submitHandler} name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={submitHandler} name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={submitHandler} name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={submitHandler} name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={submitHandler} value={comment.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled} >Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
