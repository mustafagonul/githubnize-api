// const config = require('../config/environment');
// const { User } = require('../models/user');


const AuthController = {};


AuthController.authenticate = (email, password) => new Promise((resolve, reject) => {
  /*
  const userData = { email };

  User.findOne(userData, (err, user) => {
    // Error
    if (err) {
      return reject(new Error('Authentication failed. Database Error!'));
    }

    // User not found
    if (!user) {
      return reject(new Error('Authentication failed. User not found.'));
    }

    // Wrong password
    if (!user.comparePassword(password)) {
      return reject(new Error('Authentication failed. Wrong password.'));
    }

    // Correct password
    const payload = {
      email: user.email,
      _id: user._id,
    };

    const { secret } = config.jwt.secret;
    const { expire } = config.jwt.expire;
    const token = jwt.sign(payload, secret, { expiresIn: expire });

    return resolve({
      accessToken: token,
    });
  }).select('+password').exec();
  */
});


module.exports = AuthController;
