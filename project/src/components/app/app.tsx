import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import HomeScreen from '../../pages/home/home-screen';
import LoginScreen from '../../pages/login/login-screen';
import FavouritesScreen from '../../pages/favourites/favourites-screen';
import RoomScreen from '../../pages/room/room-screen';
import NotFoundScreen from '../../pages/404/not-found-screen';

import Spinner from '../../components/spinner/spinner';
import Layout from '../layout/layout';
import ScrollToTop from '../scroll-to-top/scrool-to-top';
import PrivateRoute from '../private-route/private-route';

import AppRoutes from '../../consts/app-routes';
import { useAppSelector } from '../../hooks/useAppSelector';
import store from '../../store';

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
              <Provider store={store}>

                <PrivateRoute>
                  <FavouritesScreen />
                </PrivateRoute>
              </Provider>
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
