var request = require('request');

// get shop authorize token 
const getToken= () => {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: process.env.BASE_PAY_URL + process.env.AUTORIZE_URL,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: "grant_type=client_credentials&client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET
      }, function (error, response, body) {
        if(error){
          reject(error)
        }else{
          
          if(body){
   
            resolve(JSON.parse(body).access_token);
          }else{
            reject(new Error('err'));
            
          }
          
        }
      });
    });
  }

  exports.getToken = getToken