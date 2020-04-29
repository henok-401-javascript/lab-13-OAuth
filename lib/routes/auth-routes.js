'use strict';
const { modelSchema } = require('../models/model.js');

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const base64Decoder = (stringValue) => {
  let data = {
    username: '',
    password: '',
  };
  let bufferString = buffer.from(stringValue, 'base64').toString();
  let bufferSplit = bufferString.split(':');
  data.username = bufferSplit[0];
  data.password = bufferSplit[1];
  console.log(data);
  return data;
};

router.post('/signup', async (req, res, next) => {
  let results = await modelSchema.create(req.body);
  res.send(results);
});
router.post('/signin', (req, res, next) => {});
router.get('/users', (req, res, next) => {});

module.exports = router;
