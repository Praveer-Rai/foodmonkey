var User = require('../user/userSchema');
var Order = require('../order/orderSchema');

exports.sendemail = function (req, res) {

    User.findOne({_id: req.body.userId}, function (err, user) {
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
        var toAddress = '';

        Order.find({orderStatus: 'open',user: req.body.userId},
            function(err, orders) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                for(i = 0; i < orders.length; i++){
                    toAddress = orders[i].user.email;
                    emailBody2 = emailBody2 + '<tr><td> Order Id: ' + orders[i]._id + '</td></tr>';
                    for(j = 0; j < orders[i].ingredients.length; j++){
                        emailBody2 = emailBody2 + '<tr><td>' + orders[i].ingredients[j].name + '</td></tr>';
                    }
                    emailBody2 = emailBody2 + '<br>';
                }

                emailBody1 = emailBody1 + emailBody2 + '</table></body></html>';

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport( {
                    service:  'Mailgun',
                    auth: {
                        user: 'postmaster@sandbox190c9da203a64cd28c227600060eb86a.mailgun.org',
                        pass: '91ec9883d37f5985fe7c8a1e0e53db16'
                    }
                });

                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: '"Foodmonkey" <foodmonkey.team48@gmail.com>', // sender address
                    to: toAddress, // list of receivers
                    subject: 'You order from food monkey.', // Subject line
                    html: emailBody1 // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                 if (error) {
                 return console.log(error);
                 }
                 console.log('Message sent: ' + info.response);
                 });
                res.status(201).json();


            }).populate('user').populate('ingredients');;



    });

};
