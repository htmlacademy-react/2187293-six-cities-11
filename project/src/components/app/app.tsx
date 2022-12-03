import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import HomeScreen from '../../pages/home/home-screen';
import LoginScreen from '../../pages/login/login-screen';
import FavouritesScreen from '../../pages/favourites/favourites-screen';
import RoomScreen from '../../pages/room/room-screen';
import NotFoundScreen from '../../pages/404/not-found-screen';

import AppRoutes from '../../consts/app-routes';

import ScrollToTop from '../scroll-to-top/scrool-to-top';

import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';

import AuthorizationStatus from '../../consts/authorization-status';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks/useAppSelector';


function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading) {
    return (<Spinner />);
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout hideHeaderPaths={[AppRoutes.login]} />}>
          <Route
            index
            path={AppRoutes.main}
            element={<HomeScreen />}
          />
          <Route
            path={AppRoutes.login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoutes.favourites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavouritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.offer}
            element={<RoomScreen />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
