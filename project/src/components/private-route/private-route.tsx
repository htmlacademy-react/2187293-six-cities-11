import { Navigate } from 'react-router-dom';
import AppRoutes from '../../consts/app-routes';
import AuthorizationStatus from '../../consts/authorization-status';
import { useAppSelector } from '../../hooks/useAppSelector';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.login} />
  );
}

export default PrivateRoute;
