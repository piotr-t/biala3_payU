var express = require('express');
var router = express.Router();

// .../api/..
router.use('/', require('./index'));
router.use('/buy', require('./order'));
router.use('/users', require('./users'));
router.use('/notifications', require('./notifications'));
router.use('/password', require('./password'));

module.exports = router;