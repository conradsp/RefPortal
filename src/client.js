import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const middleware = [thunk, routerMiddleware(hashHistory)];
const initialState = window.__INITIAL_STATE__;

middleware.push(createLogger());
const store = createStore(reducers, initialState, compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));

const history = syncHistoryWithStore(hashHistory, store);
const { user: { authenticated }} = store.getState();

function scrollToTop() {
  window.scrollTo(0, 0);
}

const requireAuth = (nextState, replace) => {
  if (!sessionStorage.jwt) {
    replace('/login');
  } else {
    replace('/app/dashboard');
  }
};

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/App'),
    indexRoute: { onEnter: requireAuth },
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/500'),
      require('./routes/confirmEmail'),
      require('./routes/forgotPassword'),
      require('./routes/lockScreen'),
      require('./routes/login'),
      require('./routes/signUp'),
      require('./routes/fullscreen'),
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};

render(
  <Provider store={store}>
    <Router
      onUpdate={scrollToTop}
      history={history}
      routes={rootRoute}
    />
  </Provider>,
  document.getElementById('app-container')
);
