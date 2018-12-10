const express = require('express');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const API_PORT = process.env.API_PORT || 3000;
const app = express();
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const db = require('./models/index.js');
require('dotenv').config();
app.use(express.static(`${__dirname}/www`));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './www', 'index.html'));
});







app.post('/login', (req, res) => {
    const { email } = req.body.params;
    const { password } = req.body.params;
  

      db.User.findOne({
          attributes: ['email', 'password'],
          where: {
              email        
          }
      })
          .then(results=> {

          if (results && results.email === email) {
  
              bcrypt.compare(password, results.password, function (err, result) {
                  if (result === true)
                  {
                  res.send({ message: 'Access Granted ', status: true });
                  } else {
                      res.send({ message: 'Access Denied ', status: false });
                  }
                }) 
            }  
          
          if (!results) {
              res.send({ message: 'Access Denied ', status: false });
          }
          
      }).catch(e=>console.log(e));
  });
  







app.post('/api/db/register', (req, res) => {
    const { name } = req.body.params;
    const { email } = req.body.params;
    const { password } = req.body.params;
    const hash = bcrypt.hashSync(password, 8);

    db.User.findOne({

        where: { email },

    }).then((users) => {
        if (users) {
            res.send({ message: 'Email Already Taken', status: false });
        } else {
            db.User.create({
                name,
                email,
                password: hash,
            }).then((response) => {
                res.send({ response, message: 'Registered Successfully', status: true });
                console.log('User created');
            });
        }
    });
});










app.post('/forgot', (req, res) => {
    const { email } = req.body.params;
      db.User.findOne({
        attributes: ['id', 'email', 'password','resetPasswordToken'],
        
        where: { email },

    }).then((results) => {
        if (results && results.email == email) {

            const token = crypto.randomBytes(20).toString('hex');
                results.resetPasswordToken = token;
                results.save();
           
        
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
 
    },
  });


  const mailOptions = {
    from: `noreplydummyja@gmail.com`,
    to: `${results.email}`,
    subject: `Link To Reset Password`,
    text:
      `You are receiving this because you have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
      `http://localhost:3000/reset/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  console.log('Sending mail...');

  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      
      res.send({ message: 'Recovery Email Sent', status: true });
    }
  });

} else {
    res.send({ message: 'Email address Doesn\'t exist in DB', status: false });
    }

}).catch (e=>console.log(e))
   
});










app.post('/resettokencheck', (req, res) => {

db.User.findOne({
    attributes: ['email', 'resetPasswordToken'],
    where: {
        resetPasswordToken: req.body.params.resetPasswordToken,
       
    },
    
    }).then(result => {
    // console.log(result);
    if (result) {
        console.log('password reset link works fine!'),
        res.send({ status: true });
       
        
    } else {
        res.send({ status: false });
    }
    }).catch((e) => {
    console.log('Error: ', e);

    });

});







app.post('/resetform', (req, res, next) => {
    
    const { password } = req.body.params;
   
    db.User.findOne({
        
        where: {
            resetPasswordToken: req.body.params.resetPasswordToken,
        },
    }).then(result => {
        if (result) {
            console.log(result);
        console.log('user exists in db');
        bcrypt.hash(password, 8)
            .then(hashedPassword => {
            result.update({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            });
            })
            .then(() => {
            console.log('password updated');
            res.send({ message: 'Password Updated', status: true });
            });
        } else {
        console.log('no user exists in db to update');
        res.send({ message: 'Token Expired', status: false });
        }
    });
    });





app.use((req, res, next) => {
    res.status(404).send('Error page 404!')
});

app.listen(API_PORT);


