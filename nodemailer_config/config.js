const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_LOGIN,
      pass: process.env.MAIL_PASS
    } 
  });

  const testMessage = () => {
    const opt = {
      from: 'me',
      to: process.env.TEST_EMAIL,// your email
      subject: ' Hello world',
      text: 'Hello world. Message sended success'
    };
  
    transporter.sendMail(opt, function(error, info){
      if(error){console.log(error,'error');}else{
        console.log(info,'info');
      }
    });
  }

  const withTestAccount = async()=>{

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

          // send mail with defined transport object
        let info = await transporter.sendMail({
        from: "Fred Foo 👻", // sender address
        to: process.env.TEST_EMAIL, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>${user[0].email}</b>`, // html body
      });
        
      console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  //testMessage();
  //withTestAccount();

  module.exports = transporter;

