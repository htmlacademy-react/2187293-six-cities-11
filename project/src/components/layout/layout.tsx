import { Outlet, useLocation } from 'react-router-dom';

type LayoutProps = {
  hideHeaderPaths: string[];
};

function Layout({ hideHeaderPaths = [] }: LayoutProps) {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderPaths.includes(pathname) &&
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <button className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </button>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <button className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </button>
                </li>
                <li className="header__nav-item">
                  <button className="header__nav-link" >
                    <span className="header__signout">Sign out</span>
                  </button>
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
