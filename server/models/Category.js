const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        enum : ['todo','in-progress','done']
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'tasks'
    }]
})

module.exports = mongoose.model('category',categorySchema);