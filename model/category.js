const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name:String,
  mainImg:String
});

const CATEGORY = mongoose.model('category',categorySchema);

module.exports = CATEGORY