import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
// import { google } from '../../../config/secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export default (passport) => {
  if (!dbPassport || !dbPassport.google || !typeof dbPassport.google === 'function') {
    console.warn(unsupportedMessage('passport-google-oauth'));
    return;
  }

  /*
  * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
  *
  * - User is already logged in.
  *   - Check if there is an existing account with a provider id.
  *     - If there is, return an error message. (Account merging not supported)
  *     - Else link new OAuth account with currently logged-in user.
  * - User is not logged in.
  *   - Check if it's a returning user.
  *     - If returning user, sign in and we are done.
  *     - Else check if there is an existing account with user's email.
  *       - If there is, return an error message.
  *       - Else create a new account.
  *
  * The Google OAuth 2.0 authentication strategy authenticates
  * users using a Google account and OAuth 2.0 tokens.
  * The strategy requires a verify callback, which accepts these
  * credentials and calls done providing a user, as well
  * as options specifying a client ID, client secret, and callback URL.
  */
  passport.use(new GoogleStrategy({
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL,
    passReqToCallback: true,
  }, dbPassport.google));
};
