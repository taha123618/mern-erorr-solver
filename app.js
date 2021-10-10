const dotenv = require('dotenv');
const express = require("express");
const app = express();


// For Sercurity of password of databse 
dotenv.config({path: './config.env'});



// json ko broswer ma samjane ke lye(middleware) for Postman ma krne ke lye
app.use(express.json());

// Router Files (to make routes easily)
app.use(require('./router/rou'));


// port 
const PORT = process.env.PORT;



// Middle-Ware  for checking the user will login or not 
// const middleware = (req , res , next) =>{
// console.log("Middleware");
// next();
// }
// middleware();

app.get('/' , (req, res) =>{
    res.send("Hello world taha ahmed")
});
// app.get('/about' , middleware, (req, res) =>{
//     res.send("Hello world about")
// });
app.get('/contact' , (req, res) =>{
    res.send("Hello world contact")
});
app.get('/signin' , (req, res) =>{
    res.send("Hello world signin")
});

app.listen(PORT , ()=>{
    console.log(`Listinng on ${PORT} ...` );
})
