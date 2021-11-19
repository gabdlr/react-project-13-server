const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const { errorValidationHandler } = require('../utilities/index')

exports.contactSend = async (req, res, next) => {

    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = errorValidationHandler(validation);
        res.status(400).json(errors);
    }

    try {
        
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "019dbd3165912c",
              pass: process.env.EMAIL_PASSWORD
            }
          });

        const mailOptions = {
            from: req.body.email,
            to: 'gab.delosrios@gmail.com',
            subject: `${req.body.name} has sent you a new message from gabrieldelosrios.dev`,
            text: req.body.message
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error){
                console.log(error);
                res.status(500).json({'error': error});
            } else {
                console.log(info);
                res.status(200).json({msg: 'Thanks for contact, message sent succesfuly.'})
            }
        });
    }catch(error){
        console.log(error)
        res.status(500).json({error: ['Internal Server Error']})
    }
}