const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required:true},
    email :{type : String, unique : true},
    password : String,
    role : {type : String, enum : ['user', 'admin'], required: true}
})

module.exports = mongoose.model("User", userSchema);