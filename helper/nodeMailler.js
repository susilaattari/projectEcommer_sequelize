const nodemailer = require('nodemailer');

function nodeMail(email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'toronasi.kiyono@gmail.com',
      pass: 'petanisejahtera'
    }
  })
  
  let mailOptions = {
    from: 'toronasi.kiyono@gmail.com',
    to: email,
    subject: 'Checkout PerbotDia',
    text: `Checkout belanjaan BERHASIL !!!`
  }
  
  transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
      console.log('Error Occurs');
    } else {
      console.log(`Email sent`);
    }
  })
}

module.exports = nodeMail
