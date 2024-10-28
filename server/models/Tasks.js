const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        required : true,
        trim : true,
        type : String
    },
    description : {
        required : true,
        trim : true,
        type : String 
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model('tasks',taskSchema);