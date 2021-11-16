const mongoose = require('mongoose');

// Database Connection 
const DB = process.env.DATABASE;
// console.log(DB);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Connection Successfull");
    }).catch((err) => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected to Db");
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose is disconnected");
});

mongoose.connection.on('error', (err) => {
    //any error
    console.log(err.message);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});