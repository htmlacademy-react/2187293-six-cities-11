import { Navigate } from 'react-router-dom';
import AppRoutes from '../../consts/app-routes';
import AuthorizationStatus from '../../consts/authorization-status';

type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.login} />
  );
}

export default PrivateRoute;
