import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * GET /getUser
 */
export function getUser(req, res) {
  User.findOne({ phone: req.params.phone }, (err, user) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(user);
  });
}

export function getUserFromBlockchain(id) {
  const userPromise = User.findOne({ blockchain_id: id }).exec();
  userPromise.then((user, err) => {
    if (err) {
      console.log(err);
      // userPromise.reject(err);
    }
    return user;
  });

  return userPromise;
}

export function getUserFromPhone(phone) {
  const userPromise = User.findOne({ phone }).exec();
  userPromise.then((user, err) => {
    if (err) {
      console.log(err);
      // userPromise.reject(err);
    }
    return user;
  });

  return userPromise;
}

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do phone and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      const token = jwt.sign({ data: user.phone, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'arc-ref-camp');
      // return the information including token as JSON
      return res.json({
        token
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const user = new User({
    phone: req.body.phone,
    password: req.body.password
  });

  User.findOne({ phone: req.body.phone }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    });
  });
}

export default {
  getUser,
  getUserFromBlockchain,
  getUserFromPhone,
  login,
  logout,
  signUp
};
