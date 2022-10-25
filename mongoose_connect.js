const mongoose = require('mongoose');

const connect = async () =>{
    return await mongoose.connect(process.env.DB_CONNECT_STRING,
      { useNewUrlParser: true } );
  }

  connect().then(a =>{}).catch()

  module.exports = connect;