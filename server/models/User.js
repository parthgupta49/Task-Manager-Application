const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile"
    },
    image : {
        type : String,
    },
    token : String,
    resetPasswordExpires : {
        type : Date,
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "tasks"
    }]
});






module.exports = mongoose.model("user",userSchema);