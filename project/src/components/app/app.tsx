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

// import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';

// import AuthorizationStatus from '../../consts/authorization-status';

import CardType from '../../types/offers';

import favoirites from '../../mocks/favourites';

type AppScreenProps = {
  variants: number;
  offers: Array<CardType>;
};

function App({ variants, offers }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout hideHeaderPaths={[AppRoutes.login]} />}>
          <Route
            index
            path={AppRoutes.main}
            element={<HomeScreen variants={variants} offers={offers} />}
          />
          <Route
            path={AppRoutes.login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoutes.favourites}
            element={
              // <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavouritesScreen offers={favoirites} />
              // </PrivateRoute>
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
