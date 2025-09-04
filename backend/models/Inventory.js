const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  picture: {
    type: String, // base64 string
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
