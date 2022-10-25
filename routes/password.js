var express = require('express');
var router = express.Router();
const User = require('./../models/userSchema');
const transporter = require("./../nodemailer_config/config");





router.get('/', async (req, res, next) => {

  if(req.body.login){

    const user = await User.findByUsername(req.body.login);//find({$or:[{email:req.body.login}, {login:req.body.login}]});
      
    if(user.email){

      try{

        const linkPassword = process.env.BASE_URL+'/#/newPassword/'+user.id;

        let info = await transporter.sendMail({
          from: process.env.MAIL_FROM, // sender address
          to: process.env.TEST_EMAIL, // list of receivers
            subject: "WIRTUALNE BIURO Przypomnienie hasła", // Subject line
            text: "WIRTUALNE BIURO Przypomnienie hasła", // plain text body
            html: `
            <p>Poniżej przesyłamy link do przypomnienia hasła:</p>
            <a href="${linkPassword}">${linkPassword}</a>
            <p>Wiadomość wygenerowana automatycznie prosze na nia nie odpowiadać</p>
            <a href="${linkPassword}">Link nie działa</a>
            `, // html body
        });
                        
          console.log("Message sent: %s", info.messageId);
          res.json(user)

          }catch(error){}
             
    }else{res.status(404).json({error:'nie istnieje użytkownik o podanym loginie'});}
  } else{res.status(404).json({error:'nie istnieje użytkownik o podanym loginie'});}
});



router.get('/change', async (req, res, next) => {

  const user = await User.findByUsername(req.body.email);
  const user1 = User.findById(req.body.user_id);

  if(user){
    try{
      await user.setPassword(req.body.password);
      await user.save();
      res.status(200).json({OK:true, statusCode:0, message:'Change password success'});
    }
    catch(err){
      res.status(404).json({OK:false, statusCode:1, message:'Change password failure'});
    }
  }else{res.status(404).json({OK:false, statusCode:2, message:'User don`t exist'});};
  
});




module.exports = router;