'use strict';

class UserController {
    constructor(log, userService, httpSatus) {
        this.log = log;
        this.userService = userService;
        this.httpSatus = httpSatus;
    }

    async create(req, res) {
        try {
            const { body } = req;
            const result = await this.userService.createUser(body);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const jwt = await this.userService.login(email, password);
            const user = await this.userService.getUser(email)

            return res.status(200).json({
                username: user.email,
                token: jwt,
                uid: user.uuid
            });
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async verify(req, res) {
        try {
            res.status(200).json(
                req.decoded.data
            );
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async get(req, res) {
        try {
            const { username } = req.params;
            const result = await this.userService.getUser(username);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

}

module.exports = UserController;