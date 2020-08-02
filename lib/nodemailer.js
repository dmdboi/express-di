const nodemailer = require("nodemailer");

module.exports = {
    create: function () {
        let transporter = nodemailer.createTransport({
            host: "mail.diamondwebhosting.co.uk",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "notifier@dmdxv.com", // generated ethereal user
                pass: "7y0lmD-8q7MX:M", // generated ethereal password
            }, tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        })
        return transporter
    }
}