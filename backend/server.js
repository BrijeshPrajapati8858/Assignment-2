const app =  require('./app');
const dotenv =require ('dotenv');
const connectDB = require("./config/database");



//handling uncaught exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server because of unhandled uncaught exceptions')


        process.exit(1);

})


// using config for environment variable 
dotenv.config({path:'./config/.env'});


//data base connection to backend
connectDB();




const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})

//unhandled  promise rejections

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server because of unhandled promise rejections')

    server.close(()=>{
        process.exit(1);
    });
})