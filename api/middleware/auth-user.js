'use strict';
const { User } = require('../models');

const auth = require('basic-auth');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {
  let message;
  // Parse user's credentials from Authoriation header
  const credentials = auth(req);
  // If the user's credentials are available:
  // - attempt to retrieve user from database by their email
  if (credentials) {
    const user = await User.findOne({ email: credentials.name });
    // If a user was successfully retrieved from database:
    // - use Bcrypt npm package to compare the user's password from the
    //   authorization header to the password from database
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      // If passwords match:
      if (authenticated) {
        console.log(`Authentication successful for: ${user.fullName}`);
        // - store retrieved user object on the 'request' object so middleware
        //  following this middleware can have access to the user's info
        req.currentUser = user;
      } else {
        message = `Authentication failure for: ${user.fullName}`;
      }
    } else {
      message = `User not found for email: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  // If user authentication failed:
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
  // - return a response with a 401 unauthorized HTTP status code
  // Else if user authentication succeeded:
  // - call the next() method
};
