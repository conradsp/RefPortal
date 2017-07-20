import User from '../models/user';

export default (phone, password, done) => {
  User.findOne({ phone }, (findErr, user) => {
    if (!user) { return done(null, false, { message: `There is no record of the phone number ${phone}.` }); }
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      console.log('Password mismatch');
      return done(null, false, { message: 'Your phone number or password combination is not correct.' });
    });
  });
};
