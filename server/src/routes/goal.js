import express from 'express';
import asyncHandler from 'express-async-handler';

import { protect } from '../middleware/auth.js';

import Goal from '../models/Goal.js';
import User from '../models/User.js';

const goalRoutes = express.Router();

// Get goals
goalRoutes.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  })
);

// Set goal
goalRoutes.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error('Please add a text');
    }

    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });

    res.status(200).json(goal);
  })
);

// Update goal
goalRoutes.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedGoal);
  })
);

// Delete goal
goalRoutes.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const deletedGoal = await goal.remove();

    res.status(200).json(deletedGoal);
  })
);

export default goalRoutes;
