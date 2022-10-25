const mongoose = require('mongoose');
const { Schema } = mongoose;

const order_schema = new Schema({
    client_id: String,
    status: String,
    orderId: String,
    extOrderId: String,
    extCustomerId: String,
    order_price: Number,
    name:String
  },{
    timestamps:true
  });


const Order = mongoose.model('order', order_schema);

module.exports = Order;