const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// userSchema 
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    tokens : [
        {
            token :{
        type: String,
        required: true
            }
        }
    ]
})



// we hashing the password

userSchema.pre('save' ,async function(next){
if (this.isModified('password')){
    this.password = bcryptjs.hash(this.password, 12);
    this.cpassword = bcryptjs.hash(this.cpassword, 12);
}
next();
});

// Jwt ka schema file kam 
// we are generasting token 
userSchema.methods.generateAuthToken = async function(){
    try{
let token = jwt.sign({ _id : this._id } , process.env.SECRET_KEY);
this.tokens = this.tokens.concat({token:token});
this.save();
return token;

 }catch(err){
console.log(err);
    }
}



// Models 
const User = mongoose.model('USER',userSchema );

module.exports = User;