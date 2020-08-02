'use strict';

const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');
const uniqid = serviceLocator.get('uniqid')

var formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    form_id: { type: String, default: uniqid('f') },
    user_id: { type: String, required: true },
    redirectURL: {type: String },
    submissions: { type: Number, required: true, default: 0 },
    sendEmail: { type: Boolean, default: false},
    email: { type: String },
    webhookType: { type: String},
    sendWebhook: { type: Boolean, default: false},
    webhookURL: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model("Form", formSchema);