'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
  username: { type: 'string', unique: true, require: true },
  password: { type: 'string', require: true },
  firstname: { type: 'string' },
  lastname: { type: 'string' },
});

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
schema.methods.comparePasswords = async function (plainTextPass) {
  // "this" >> refers to a single record
  //console.log('Method >>', this);
  return await bcrypt.compare(plainTextPass, this.password);
};

const model = mongoose.model('users', schema);

module.exports = model;
