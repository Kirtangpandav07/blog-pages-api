const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title:String,
    description:String,
    image:[String],
    category:{ type: Schema.Types.ObjectId,ref: 'category'}
});

const BLOG = mongoose.model('blog', blogSchema);

module.exports = BLOG