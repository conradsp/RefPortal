/**
 * Routes for express app
 */
import passport from 'passport';
import { getAccounts, getTransactions, buyProduct } from './wallet';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const productsController = controllers && controllers.products;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

export default (app) => {
  // user routes
  if (usersController) {
    app.get('/users/:phone', isLoggedIn, usersController.getUser);
    app.post('/sessions', usersController.login);
    app.post('/users', isLoggedIn, usersController.signUp);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // product routes
  if (productsController) {
    app.get('/product/:id', isLoggedIn, productsController.getProduct);
    app.get('/product', isLoggedIn, productsController.all);
    app.post('/product/:id', isLoggedIn, productsController.add);
    app.put('/product/:id', isLoggedIn, productsController.update);
    app.delete('/product/:id', isLoggedIn, productsController.remove);
  } else {
    console.warn(unsupportedMessage('products routes'));
  }

  // wallet methods
  app.get('/wallet/accounts', isLoggedIn, getAccounts);
  app.put('/wallet/buy/:id', isLoggedIn, buyProduct);
  app.get('/wallet/:id', isLoggedIn, getTransactions);
};
