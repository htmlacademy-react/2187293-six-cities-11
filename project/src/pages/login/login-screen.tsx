import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from '../../consts/app-routes';
import AuthType from '../../types/auth';
import { fetchLoginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import AuthorizationStatus from '../../consts/authorization-status';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getIsLoading } from '../../store/offers-process/selectors';

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthType) => {
    dispatch(fetchLoginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const isLoading = useAppSelector(getIsLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (!isLoading && authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoutes.main);
    }
  }, [isLoading, authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.main} className='header__logo-link'>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoutes.main} className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
