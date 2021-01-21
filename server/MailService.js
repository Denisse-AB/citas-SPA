const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class MailService {
    constructor(host, port, user, password) {
        const options = {
            viewEngine: {
                partialsDir: "views\\partials",
                layoutsDir: "views\\layouts",
                extname: ".hbs"
            },
            extName: ".hbs",
            viewPath: "views"
        };

        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        this._transporter.use("compile", hbs(options));
    }
    sendMail({ to, subject, template, context }) {
        return this._transporter.sendMail({
            to,
            from: process.env.FROM_EMAIL,
            subject,
            template,
            context,
        });
    }
}

module.exports = MailService;