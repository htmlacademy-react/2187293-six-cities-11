import {
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import AuthorizationStatus from '../../consts/authorization-status';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelector';
import { fetchLogoutAction } from '../../store/api-actions';
import AppRoutes from '../../consts/app-routes';

type LayoutProps = {
  hideHeaderPaths: string[];
};

function Layout({ hideHeaderPaths = [] }: LayoutProps) {
  const { pathname } = useLocation();
  const favorites = useAppSelector((state) => state.favorites);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(fetchLogoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth && user) {
    return (
      <>
        {!hideHeaderPaths.includes(pathname) &&
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to={AppRoutes.main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.favourites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={user.avatarUrl} alt="User avatar" />
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to={AppRoutes.login} onClick={onLogout} className="header__nav-link" >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>}
        <Outlet />
      </>

    );
  }
  return (
    <>
      {!hideHeaderPaths.includes(pathname) &&
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to={AppRoutes.main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item">
                    <Link to={AppRoutes.login} className="header__nav-link" >
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>}
      <Outlet />
    </>
  );
}

export default Layout;
