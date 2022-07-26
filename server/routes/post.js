require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql');
const MailService = require("../MailService");
const mailService = new MailService();

const router = express.Router();

// database conection
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

//post
router.post('/',
    // Validation
    body('email').isEmail().normalizeEmail(),
    body('name').notEmpty().isString().trim().escape(),
    body('tel').notEmpty().isNumeric().isLength({ max: 11 }),
    body('date').notEmpty().isString(),
    body('selected').notEmpty().isString(),
    (req, res) => {
    const { email, name, tel, date, selected, lang } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400)
    }

    const date_format = date.split("T")[0];
    let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // SQL
    const count = `SELECT time, date FROM appointments WHERE time = '${selected}' AND date = '${date_format}'`;
    const insert = `INSERT INTO appointments (email, name, tel, date, time, created_at) VALUES ('${email}', '${name}', '${tel}', '${date_format}', '${selected}', '${created_at}')`;

    con.query(count, function (err, result) {
        if (err) throw err

        if (result.length >= 3) {
            res.sendStatus(202);
        } else {
            con.query(insert, async function (err) {
                if (err) throw err

                const appointment = {
                    date: date_format,
                    name: name,
                    time: selected
                };

                const en_mailInfo = {
                    from: '"John Doe 🧒" <company_name@example.com>',
                    to: email,
                    subject: "Greetings, Your Appointment with Company",
                    template: "appConfirmation",
                    context: appointment
                };

                const es_mailInfo = {
                    from: '"John Doe 🧒" <company_name@example.com>',
                    to: email,
                    subject: "Hola, Tu cita fue aceptada.",
                    template: "es_appConfirmation",
                    context: appointment
                };

                const mailInfo = (lang === 'en') ? en_mailInfo : es_mailInfo;

                // await mailService.sendMail(mailInfo
                // ).catch(err => {
                //     console.log(err);
                // });

                res.status(201).json({ date: date_format, time: selected });
            })
        }
    })
});

module.exports = router;