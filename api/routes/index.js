const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Goal = require('../models/goal');
const { authenticateUser } = require('../middleware/auth-user');

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
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;

    res.status(200).json({ name: user.fullName, email: user.email });
  })
);

// POST new user
router.post(
  '/users',
  asyncHandler(async (req, res, next) => {
    const newUser = await req.body;
    const errors = [];
    // validate form data
    if (!newUser.fullName) {
      errors.push("Please provide a value for 'Name'");
    }

    if (!newUser.email) {
      errors.push("Please provide a value for 'Email'");
    }

    if (!newUser.password) {
      errors.push("Please provide a value for 'Password'");
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
    }

    if (newUser.password) {
      User.findOne({ email: newUser.email }, (err, user) => {
        if (err) {
          return next(err);
        } else {
          if (user) {
            errors.push(
              'A user with that email is already registered. Please use a different email.'
            );
            res.status(400).json({ errors });
          } else {
            // hash user password
            bcrypt.hash(newUser.password, 10, (err, hash) => {
              newUser.password = hash;
              // add new user to database
              User.create(newUser, (err, user) => {
                if (err) {
                  return next(err);
                } else {
                  // return 201 status code
                  // login user after creating account
                  console.log('New user was successfully created!');
                  res.status(201).end();
                }
              });
            });
          }
        }
      });
    }
  })
);

// GOAL ROUTES //

// GET goals related to user
router.get(
  '/goals',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const goals = await Goal.find({ author: { _id: req.currentUser._id } });
    res.status(200).json(goals);
  })
);

// GET single goal
router.get(
  '/goals/:goalId',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const goalId = req.params.goalId;
    if (goalId.length === 24) {
      const goal = await Goal.findById(goalId);
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  })
);

// POST new goal
router.post(
  '/goals',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const newGoal = await req.body;
    const currentUser = await req.currentUser;
    if (newGoal !== null) {
      console.log(newGoal);
      newGoal.author = currentUser._id;
      Goal.create(newGoal, (err, goal) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log('New goal was successfully created!');
          res.status(201).json(goal);
        }
      });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  })
);

// PUT(update) goal
router.put(
  '/goals/:goalId',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const goalId = req.params.goalId;
    const updatedGoal = req.body;
    console.log(updatedGoal, goalId.length);
    if (goalId.length === 24) {
      const currentGoal = await Goal.findById(goalId);
      if (currentGoal) {
        const goal = await Goal.updateOne({ _id: goalId }, updatedGoal);
        console.log(goal);
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  })
);

// DELETE goal
router.delete(
  '/goals/:goalId',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const goalId = req.params.goalId;
    if (goalId.length === 24) {
      const goal = await Goal.findById(goalId);
      if (goal) {
        goal.remove();
        res.status(204).end();
      }
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  })
);

// JOURNAL ROUTES //

// GET journal entries related to user
// router.get('/journal', asyncHandler(req, res, next) => {
//   const journal = await
// })
// POST new journal entry
// PUT journal entry
// DELETE journal entry

module.exports = router;
