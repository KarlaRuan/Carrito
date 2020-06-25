const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  model: {
    type: String
  },
  desc: {
    type: String
  },
  price: {
    type: Number
  },
}, {
  collection: 'products'
})

module.exports = mongoose.model('Product', productSchema)
