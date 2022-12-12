import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import AppRoutes from '../../consts/app-routes';
import AuthorizationStatus from '../../consts/authorization-status';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.login} />
  );
}

export default memo(PrivateRoute);
