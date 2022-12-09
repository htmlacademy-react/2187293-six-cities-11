import CommentUser from './comment-user';

type Review = {
  id: string;
  user: CommentUser;
  rating: number;
  comment: string;
  date: string;
};

export default Review;
