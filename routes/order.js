var express = require('express');
var router = express.Router();
var request = require('request');
const Order = require('./../models/orderSchema');
const authMidlewear = require('./../auth.midleware');
const {getToken} = require('./../functions'); 
const RequestIp = require('@supercharge/request-ip');


if(process.env.NODE_ENV='development'){
  //require('./../testOrder'); 
}



const getIP = (ip) =>{
  //return ip
  if (ip.substr(0, 7) == "::ffff:") {
    return ip.substr(7)
  }
}

const createOrder  = async (tokenn, req, id) =>{

  const bodyReq = req.body;
  const user =req.user;

  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: process.env.BASE_PAY_URL + process.env.ORDER_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ tokenn,
      },
      body: `
      {
        "continueUrl":"` +process.env.BASE_URL +  process.env.CONTINUE_URL + `",
        "customerIp": "` + getIP(req.headers['x-forwarded-for'] || req.connection.remoteAddress)+ `",
        "currencyCode": "PLN",
        "notifyUrl": "`+ process.env.BASE_URL_BACKEND + process.env.NOTIFICATIONS_URL + `",
        "merchantPosId": ${process.env.CLIENT_ID},
        "description": "wirtualOffice",
        "totalAmount": "`+bodyReq.totalAmount+`",
        "extOrderId":"`+ id +`",
        "payMethods":{"type":"PAYMENT_WALL"},
        "buyer": {
            "language": "pl",
            "email": "`+ user.email +`",
            "phone": "`+bodyReq.buyer.phone+`",
            "firstName": "`+ user.first_name +`",
            "lastName": "`+ user.last_name +`",
            "extCustomerId":"`+ user.id +`",
            "customerId":"`+ user.id +`"
        },
        "products": [
            {
                "name": "`+bodyReq.product.name+`",
                "unitPrice": "`+bodyReq.totalAmount+`",
                "quantity": "1"
            }
        ]
    }
      `
    }, async (error, response, body) => {
      const bodyPars = JSON.parse(body);
      if(bodyPars.status.statusCode === "SUCCESS"){
        resolve(bodyPars);}
      else{reject({OK:false})}
    });

  })
}



router.post('/order', authMidlewear, async (req, res, next) => {

  try{
    const order = await new Order();
    const id = order.id;
    const tt = await getToken();
    const ord = await createOrder(tt,req, id);
    order.status = "PENDING";
    order.orderId = ord.orderId;
    order.extOrderId = ord.extOrderId;
    order.extCustomerId = req.user.id;
    order.name = req.body.product.name;
    order.order_price = req.body.totalAmount;
    await order.save();
    res.json({url: ord.redirectUri});
  }catch(err){
    res.status(404).json({body:'błąd', OK:false, token: false});
  };
  
});

// get ip customer
router.get('/data', function(req, res) {
  
  request({
    method: 'GET',
    url: process.env.BASE_IP_URL,
    headers: {
      'Content-Type': 'text/plain'
    }}, function (error, response, body) {
      if(error){
        res.json(error)
      }
      if(body){res.send(body)}

     
    })
});



// get pay methods
router.get('/methods',async function(req, res, next) {
  getToken().then(token=>{
    request({
      method: 'GET',
      url: process.env.BASE_PAY_URL + "api/v2_1/paymethods",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token,
        "Cache-Control": "no-cache"
      }}, function (error, response, body) {
        if(error){
          res.json(error)
        }
        if(body){
          res.json(JSON.parse (body))}
      })
  }).catch(err =>res.json({err:'brak'}));

});





module.exports = router;