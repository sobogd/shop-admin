import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Error, Loading } from 'utils/context';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles.css';
import { routes } from 'consts';
import { useTranslation } from 'react-i18next';

const Root = () => {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log('Error', error); // TODO: Сделать компонент ошибок.

  // Возвращаем основные компоненты приложения с контекстом.
  return (
    <Loading.Provider value={[setLoading]}>
      <Error.Provider value={[setError]}>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>{t('logo')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {routes.map(route => (
                  <Link to={route.path} className="nav-link">
                    {route.name}
                  </Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="container">
          <Switch>
            {routes.map(route => (
              <Route path={route.path}>
                {route.list}
                <Route exact path={`${route.path}:urlParam/`}>
                  {route.detail}
                </Route>
              </Route>
            ))}
          </Switch>
        </Container>
        {loading && (
          <div className="spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          </div>
        )}
      </Error.Provider>
    </Loading.Provider>
  );
};

export default withRouter(Root);
