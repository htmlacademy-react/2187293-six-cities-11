import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationStatus from '../../consts/authorization-status';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelector';
import AppRoutes from '../../consts/app-routes';
import { toggleFavorite } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type FavoriteProps = {
  offerId: number;
  isFavorite: boolean;
  iconType: string;
};

function FavoriteButton(props: FavoriteProps) {
  const { offerId, isFavorite, iconType } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isIconFavorite, setIconFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classNames = {
    active: `${iconType}__bookmark-button--active`,
    regular: `${iconType}__bookmark-button`,
  };

  const width = iconType === 'property' ? 31 : 18;
  const height = iconType === 'property' ? 33 : 19;


  const handleFavoriteClick = useCallback(() => () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIconFavorite(!isIconFavorite);
      dispatch(toggleFavorite({ offerId, status: isIconFavorite ? 0 : 1 }));
    } else {
      navigate(AppRoutes.login);
    }
  }, [
    dispatch,
    isIconFavorite,
    offerId,
    authorizationStatus,
    navigate,
  ]);

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
