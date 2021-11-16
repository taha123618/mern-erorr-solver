const dotenv = require('dotenv');
const express = require("express");
const app = express();


// For Sercurity of password of databse 
dotenv.config({ path: './config.env' });



// json ko broswer ma samjane ke lye(middleware) for Postman ma krne ke lye
app.use(express.json());

// Router Files (to make routes easily)
app.use(require('./router/rou'));


// port 
const PORT = process.env.PORT || 5000;



// Middle-Ware  for checking the user will login or not 
// const middleware = (req , res , next) =>{
// console.log("Middleware");
// next();
// }
// middleware();

app.get('/', (req, res) => {
    res.send("Hello world taha ahmed")
});
// app.get('/about' , middleware, (req, res) =>{
//     res.send("Hello world about")
// });
// app.get('/contact' , (req, res) =>{
//     res.send("Hello world contact")
// });
app.get('/signin', (req, res) => {
    res.send("Hello world signin")
});

// 3 step of Heroku
if (process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
    }
    

app.listen(PORT, () => {
    console.log(`Listinng on ${PORT} ...`);
})
