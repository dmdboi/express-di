'use strict';

class UserService {
  constructor(log, mongoose, httpStatus, jwt, config) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.jwt = jwt
    this.config = config
  }

  async createUser(body) {
    const Users = this.mongoose.model('Users');
    const { email } = body;
    const user = await Users.findOne({ email });

    if (user) {
      const err = 'User with email already exists'
      return err;
    }

    let newUser = new Users(body);
    newUser.email = email.toLowerCase()
    newUser.password = newUser.encryptPassword(body.password)
    newUser = await newUser.save();

    this.log.info('User Created Successfully');
    return newUser;
  }

  async login(email, password) {
    const Users = this.mongoose.model('Users');

    const user = await Users.findOne({ email });

    if (!user) {
      const err = 'User does not exist'
      return err
    }

    if (user) {
      if (user.validPassword(password)) {
        const accessToken = this.jwt.sign({
          data: user
        }, this.config.app.secret, { expiresIn: '1h' })

        this.log.info('User Authenticated Successfully');
        return accessToken
      }

      if (!user.validPassword(password)) {
        const err = 'Inccorrect User Details'
        return err
      }


    }
  }

  async getUser(email) {
    const Users = this.mongoose.model('Users');
    const user = await Users.findOne({ email });

    if (!user) {
      const err = `User with username - ${email} does not exists`
      return err;
    }

    this.log.info('User fetched Successfully');
    return user;
  }
}

module.exports = UserService;