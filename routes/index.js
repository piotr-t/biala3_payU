var express = require('express');
var router = express.Router();


// get pay methods
router.get('/',async function(req, res, next) {
  res.json({api:true})

})


module.exports = router;
