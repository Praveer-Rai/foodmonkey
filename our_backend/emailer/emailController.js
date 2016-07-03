var User = require('../user/userSchema');
var Order = require('../order/orderSchema');

exports.sendemail = function (req, res) {

    User.findOne({_id: req.params.userId}, function (err, user) {
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid User');
            return;
        }

        var emailBody1 = '<html><body> <p> Please find your order details below</p> <table>';
        var emailBody2 = '';

        var userOrders = Order.find({orderStatus: 'open',user: req.params.userId},
            function(err, orders) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
            });

        for(i = 0; i < userOrders.length; i++){
            emailBody2 = emailBody2 + '<tr><td>' + userOrders[i]._id + '</td></tr>';
        }

        emailBody1 = emailBody1 + emailBody2 + '</table></body></html>';
        console.log(emailBody1);



        var nodemailer = require('nodemailer');

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://foodmonkey.team48@gmail.com:sebateam48@smtp.gmail.com');

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Foodmonkey" <foodmonkey.team48@gmail.com>', // sender address
            to: 'raipraveer@gmail.com', // list of receivers
            subject: 'You order from food monkey.', // Subject line
            html: emailBody1 // html body
        };

        // send mail with defined transport object
       /* transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });*/
        res.status(201).json();

    });

};
