'use strict';
const { modelSchema } = require('../models/model.js');
const auth = require('../middleware/auth.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/signup', auth, async (req, res, next) => {
  if (req.user.username && !req.user._id) {
    let user = await modelSchema.create({ ...req.user, ...req.body });
    res.status(200);
    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.send({ user, token });
    console.log(user);
    return;
  } else {
    next({ err: 401, msg: 'The user exists' });
  }
});
router.post('/signin', auth, async (req, res, next) => {
  if (req.user._id) {
    let token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.status(200);
    res.send({ user: req.user, token });
    return;
  } else {
    next({ err: 401, msg: 'user not found' });
  }
});
router.get('/users', auth, (req, res, next) => {});

module.exports = router;
