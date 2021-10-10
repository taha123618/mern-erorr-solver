const mongoose = require('mongoose');

// Database Connection 
const DB = process.env.DATABASE;
// console.log(DB);
mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})
.then( () =>{
console.log("Connection Successfull");
}).catch( (err) =>{ 
console.log("No Connection");
});

// jhanzain work 
// mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.on('connected', function () {
//     console.log("Mongoose is connected");
// });

// mongoose.connection.on('disconnected', function () {
//     console.log("Mongoose is disconnected");
//     process.exit(1);
// });

// mongoose.connection.on('error', function (err) { //any error
//     console.log('Mongoose connection error: ', err);
//     process.exit(1);
// });

// process.on('SIGINT', function () {
//     console.log("app is terminating");
//     mongoose.connection.close(function () {
//         console.log('Mongoose default connection closed');
//         process.exit(0);
//     });
// });