const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const user_schema = new Schema({
    login: String,
    first_name: String,
    last_name: String,
    email: {type: String, trim: true}
  },{
    timestamps:true
  });

  user_schema.plugin(passportLocalMongoose, 
    { usernameField: 'email' , usernameQueryFields:[ 'login'], /*   populateFields:['username', 'login'], */ /* findByUsername: async (a, b)=>{
      return await a.findOne(b); */
     });

const User = mongoose.model('user', user_schema);

module.exports = User;