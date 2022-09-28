require('dotenv').config();
const express = require('express');
const { validationRules, validate } = require('../validation/validation');
const mysql = require('mysql2');
const MailService = require("../MailService");
const mailService = new MailService();

const router = express.Router();

// database connection
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

router.post('/', validationRules(), validate, (req, res) => {
    const { email, name, tel, date, selected, lang } = req.body;

    let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // SQL
    const count = 'SELECT time, date FROM appointments WHERE time = ? AND date = ?';
    const insert = `INSERT INTO appointments (email, name, tel, date, time, created_at) VALUES ('${email}', '${name}', '${tel}', '${date}', '${selected}', '${created_at}')`;

    con.execute(count, [selected, date], function (err, result) {
        if (err) throw err

        // Tres citas por hora
        // Three appointments per hour
        if (result.length >= 3) {
            res.sendStatus(202);
        } else {
            con.query(insert, async function (err) {
                if (err) throw err

                const appointment = {
                    date: date,
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

                await mailService.sendMail(mailInfo
                ).catch(err => {
                    console.log(err);
                });

                res.status(201).json({ date: date, time: selected });
            })
        }
    })
});

module.exports = router;