var express = require('express');
var router = express.Router();
const User = require('./../models/userSchema');
const authMidlewear = require('./../auth.midleware')
const passport = require('passport');
const Order = require('../models/orderSchema');
const jwt = require('jsonwebtoken');




router.post('/login', passport.authenticate('local', { session: false }), async (req, res, next) =>{
  const token = await jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
  res.json({token:token});
});


router.post('/register', async (req, res, next) => {
  const { first_name, last_name, email, password, login, username } = req.body;
  const user = new User({ first_name, last_name, email, login, username });
  await User.register(user, password, (err, account) => {
    if(err){res.send(err)}else{res.send(account)};
  });
});


router.get('/account', authMidlewear, async (req, res, next) => {
  const orders = await Order.find({extCustomerId:req.user.id});
  res.json(orders);
});

router.post('/actualize', authMidlewear, async (req, res, next) => {

  try{
    const user = await User.findByUsername(req.user.email);
    if(user){
      await user.setPassword(req.body.password);
      await user.save();
      res.status(200).json({OK:true})
    }else{
      res.status(404).json({OK:false, message:""})
    }

  }
  catch(err){
    res.status(404).send(err)
  }

});


router.get('/authenticate', authMidlewear, async (req, res, next) => {
  // or Unauthorized
 res.json({OK:true})
});


router.get('/all', async (req, res, next) => {
  const user = await User.find({});
  res.json(user)
});


module.exports = router;
