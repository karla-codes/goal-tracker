const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Goal = require('../models/goal');

// async/await handler function to wrap each route
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
// ***** ROUTES *****

// USER ROUTES //

// GET user

router.get(
  '/users',
  asyncHandler(async (req, res) => {
    // wait for response from database
    // return user information, minus password
    const user = await User.findOne({ email: req.body.email }).select(
      '-password'
    );
    res.status(200).json(user);
  })
);

// POST new user
router.post(
  '/users',
  asyncHandler(async (req, res, next) => {
    const newUser = await req.body;
    if (newUser.password) {
      // hash user password
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        newUser.password = hash;
        // add new user to database
        User.create(newUser, (err, user) => {
          if (err) {
            return next(err);
          } else {
            // return 201 status code
            console.log('New user was successfully created!');
            res.status(201).end();
          }
        });
      });
    }
  })
);

// GOAL ROUTES //

// GET goals related to user
router.get(
  '/goals',
  asyncHandler(async (req, res, next) => {
    const goals = await Goal.find({ userId: req.body.userId });
    res.status(200).json(goals);
  })
);

// GET single goal
router.get(
  '/goals/:goalId',
  asyncHandler(async (req, res, next) => {
    const goal = await Goal.findOne({ _id: req.params.goalId });
    if (goal) {
      res.status(200).json(goal);
    }
  })
);

// POST new goal
router.post(
  '/goals',
  asyncHandler(async (req, res, next) => {
    const newGoal = await req.body;
    if (newGoal) {
      newGoal.user = req.body.userId;
      Goal.create(newGoal, (err, goal) => {
        if (err) {
          return next(err);
        } else {
          console.log('New goal was successfully created!');
          res.status(201).json(goal);
        }
      });
    }
  })
);
// PUT(update) goal
// DELETE goal

// JOURNAL ROUTES //

// GET journal entries related to user
// POST new journal entry
// PUT journal entry
// DELETE journal entry

module.exports = router;

// set error status code to 400 and return error w/ next()
// const err = new Error('All fields are required');
// err.status = 400;
// next(err);
