'use strict';

class IndexController {
    constructor(log) {
        this.log = log;
    }

    async get(req, res) {
        try{
            res.json("Hello World");
        } catch (err) {
            this.log.error(err.message);
            res.json(err);
        }
    }

    async home(req, res) {
        try{
            res.json("This is home");
        } catch (err) {
            this.log.error(err.message);
            res.json(err);
        }
    }

}

module.exports = IndexController;