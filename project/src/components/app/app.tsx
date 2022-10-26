import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import HomeScreen from '../../pages/home/home-screen';
import LoginScreen from '../../pages/login/login-screen';
import FavouritesScreen from '../../pages/favourites/favourites-screen';
import RoomScreen from '../../pages/room/room-screen';
import NotFoundScreen from '../../pages/404/not-found';

import AppRoutes from '../../consts/app-routes';

import ScrollToTop from '../scroll-to-top/scrool-to-top';

import PrivateRoute from '../private-route/private-route';

import AuthorizationStatus from '../../consts/authorization-status';

type AppScreenProps = {
  variants: number;
};

function App({ variants }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoutes.main}
          element={<HomeScreen variants={variants} />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
