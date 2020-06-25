const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
  model: {
    type: String
  },
  desc: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
}, {
  collection: 'cart'
})

module.exports = mongoose.model('Cart', cartSchema)
