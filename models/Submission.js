'use strict';

const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');
const uniqid = serviceLocator.get('uniqid')

const entrySchema = new mongoose.Schema({
    form_id: { type: String, required: true },
    sub_id: { type: String, unique: true, required: true, default: uniqid('s')},
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Submission", entrySchema);