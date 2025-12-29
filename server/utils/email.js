const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendEmail = async (to, subject, html) => {

    try {

        const info = transporter.sendMail({
            from: "support <on-replychatbook@gmail.com>",
            subject, 
            to,
            html
        })

        console.log(`Email sent succasffuly ${to} ${(await info).messageId}`);
        return info;


    } catch (error) {
        console.log(error);
    }


}

module.exports = sendEmail;