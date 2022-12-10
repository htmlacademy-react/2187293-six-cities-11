import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationStatus from '../../consts/authorization-status';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelector';
import AppRoutes from '../../consts/app-routes';
import { toggleFavorite } from '../../store/api-actions';

type FavoriteProps = {
  offerId: number;
  onToggle: (() => void) | null;
  isFavorite: boolean;
  iconType: string;
};

function FavoriteButton(props: FavoriteProps) {
  const { offerId, isFavorite, iconType } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [isIconFavorite, setIconFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classNames = {
    active: `${iconType}__bookmark-button--active`,
    regular: `${iconType}__bookmark-button`,
  };

  const width = iconType === 'property' ? 31 : 18;
  const height = iconType === 'property' ? 33 : 19;


  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIconFavorite(!isIconFavorite);
      dispatch(toggleFavorite({ offerId, status: isIconFavorite ? 0 : 1 }));
      if (props.onToggle) {
        props.onToggle();
      }
    } else {
      navigate(AppRoutes.login);
    }
  };

  return (
    <button
      className={`${isIconFavorite ? classNames.active : classNames.regular} button`}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={`${iconType}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
