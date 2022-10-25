var express = require('express');
var router = express.Router();
const Order = require('./../models/orderSchema');
const transporter = require("./../nodemailer_config/config");


const SendEmailToAdmin = async (subject, message) => {
  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.ADMIN_EMAIL,
      subject: "WIRTUALNE BIURO " + subject,
      text: message,
      html: `<p>${message}</p>`
  });
                  
  console.log("Message sent: %s", info.messageId);

}

  
  router.post('/', async function(req, res, next) {

    try{
      let order = await Order.findById(req.body.order.extOrderId);
      if(order){
        order.status = req.body.order.status;
        await order.save(); 
        if(req.body.order.status !=='PENDING'){
          await SendEmailToAdmin('zamówienie', 'nowe zamówienie o id: '+ req.body.order.extOrderId+', status: ' + req.body.order.status)
        }
      }else{
        await SendEmailToAdmin('zamówienie problem', 'nowe zamówienie o id: '+ req.body.order.extOrderId +' , użtkownik nie istnieje')
      }
    }catch(error){
      await SendEmailToAdmin('zamówienie problem', 'nowe zamówienie o id: '+ 
        req.body.order.extOrderId+', problem z zapisaniem statusu:' + req.body.order.status)
    };
    res.status(200);
  });


module.exports = router;