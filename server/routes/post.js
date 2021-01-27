require('dotenv').config();
const express = require('express');
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
router.post('/', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const tel = req.body.tel;
    const date = req.body.date;
    const selected = req.body.selected;
    const lang =req.body.lang;
    var created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const count = "SELECT time, date FROM appointments WHERE date ? AND time = ?" [date, selected];
    const insert = "INSERT INTO appointments (email, name, tel, date, time, created_at) VALUES ('?, ?, ?, ?, ?, ?')";
    const values = [email, name, tel, date, selected, created_at];
    // validations
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validName = /^[A-Za-z\s]+$/.test(name);

    con.query(count, function (err, result) {
        if (err) throw err

        if (result.length >= 3) {
            res.status(202).send();

        } else if (!email || !name || !tel || !date || !selected || isNaN(tel) == true || validEmail === false || validName === false) {
            res.status(400).send();

        } else {
            con.query(insert, values, function (err, result) {
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

                mailService.sendMail(mailInfo
                ).catch(err => {
                    console.log(err);
                });

                res.status(201).json({ date: date, time: selected });
            })
        }
    })
});

module.exports = router;
