'use strict';
const usersSchema = require('./users-schema.js');

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  async readById(_id) {
    let results = await this.schema.findById(_id);
    return results;
  }
  async readByQuery(record) {
    let results = await this.schema.find(record);
    return results;
  }
  async create(data) {
    let results = await this.schema.create(data);
    return results;
  }
  async update(_id, record) {
    let results = await this.schema.findByIdAndUpdate(_id, record);
    if (results && results.nModified === 1) {
      let newResult = await this.read(_id);
      return newResult;
    } else {
      return false;
    }
  }
  async delete(_id) {
    let results = await this.schema.findByIdAndDelete(_id);
    return results;
  }
}

module.exports = {
  modelSchema: new Model(usersSchema),
};
