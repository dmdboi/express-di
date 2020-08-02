'use strict';

const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');
const uniqid = serviceLocator.get('uniqid')
const bcrypt = serviceLocator.get('bcrypt')

const userSchema = new mongoose.Schema({
    uuid: {type: String, unique: true, default: uniqid('u')},
    username: { type: String, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
    verified: { type: Boolean, default: false}
  },
  {
    timestamps: true
  }
);

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('Users', userSchema);