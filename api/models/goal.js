const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: [true, 'Please enter a goal'],
    trim: true,
  },
  motivations: {
    type: String,
    trim: true,
  },
  progressMilestones: {
    type: String,
    trim: true,
  },
  accountability: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
