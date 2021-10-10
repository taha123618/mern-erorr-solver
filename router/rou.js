const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');


// require('../db/conn');
const mongoose = require('mongoose');

// Database Connection 
const DB = process.env.DATABASE;
console.log(DB);
// mongoose.connect("mongodb+srv://taha:taha@cluster0.abfbc.mongodb.net/mernproject?retryWrites=true&w=majority", {
//     useNewUrlParser : true,
//     useCreateIndex : true,
//     useUnifiedTopology : true,
//     useFindAndModify : false
// })
// .then( () =>{
// console.log("Connection Successfull");
// }).catch( (err) =>{
// console.log(err);   
// console.log("No Connection");
// });
mongoose.connect("mongodb+srv://taha:taha123@cluster0.abfbc.mongodb.net/mernproject?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
const User = require('../model/userSchema');

router.get('/' , (req, res) =>{
    res.send("Hello world Router.js")
});


// REGISTRATION

// Using Promise

// router.post('/register' , (req , res) =>{

// // Promise
// const {name , email , phone , work , password , cpassword} = req.body;

// // ValidaTION
// if( !name || !email || !phone || !work || !password || !cpassword){
//  return res.status(422).json({ Error : "Plz fil the field proply!"});  
// }


// // User (exitsting email to add nhi kr rha ) Validation 
// User.findOne( {email:email})
// .then( (UserExit) =>{
//     if(UserExit){
//         return res.status(422).json({ Error : "Already Email is Exits!"}); 
//     }

// // new user create kre ge 
// const user = new User({name , email , phone , work , password , cpassword});
// user.save().then( () =>{
//     res.status(201).json({ message : "user Registred Sucessfully"})
// }).catch( (err) =>{
//     res.status(500).json({ error : "Failed to registred"})
// })



// }).catch( (err) =>{
// console.log(err);
// });
  
// })


// Using Asyc

router.post('/register' , async(req , res) =>{

// Promise
const {name , email , phone , work , password , cpassword} = req.body;



// ValidaTION
if( !name || !email || !phone || !work || !password || !cpassword){
 return res.status(422).json({ Error : "Plz fil the field proply!"});  
}

try{
// User (exitsting email to add nhi kr rha ) Validation 
 const UserExit = await User.findOne( {email:email})
 if (UserExit){
    return res.status(422).json({ Error : "Already Email is Exits!"}); 
}else if (password != cpassword){
    return res.status(422).json({ Error : "Password are not match"})
}else{
// new user create kre ge 
const user = new User({name , email , phone , work , password , cpassword}); 

// password Hashing by bcryptjs
// pre save se phele wala

const userRegister = await user.save();
if(userRegister){
res.status(201).json({ message : "user Registred Sucessfully"})
}else{
    res.status(500).json({ error : "Failed to registred"})  
}

}

}
 catch (err) {
console.log(err); 
}  
});



 //    login (AFTER REGISTRATION)

router.post('/signin' , async(req,res) =>{
try{
    const {email , password} = req.body;
    if( !email || !password ) {
        return res.status(400).json({error: "Plz filled the data"});
    }
const userLogin = await User.findOne({ email : email});
// console.log(userLogin);

// userlogin ke bad kuche show krwana ha 
if(userLogin){
// password verifiaction 
const isMatch = await bcryptjs.compare(password, userLogin.password );

// JWT token authentacation 
const token = await userLogin.generateAuthToken();

// cookies genetrate by token 
res.cookie("jsontoken" , token , {
//    30 expries token 
expires: new Date(Date.now() + 25892000000) ,
httpOnly : true
});




if(!isMatch){
    res.status(400).json({error: "Invalid Crediential"}); 
}else{
    res.json({message: "user signin sucessfully"});
}

}else{
    res.status(400).json({error: "Invalid Crediential"}); 
}

}catch(err){
console.log(err);
}
});

// Aboutus page ke Authentication 
router.get('/about' , authenticate, (req, res) =>{
       console.log("authenticate hogya");
        res.send(req.rootUser);
    });

    // New route for storing data in conatct and Home 

router.get('/getdata' , authenticate, (req, res) =>{
       console.log("authenticate conatct ka  ");
        res.send(req.rootUser);
    });







module.exports = router;