const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const todoRouter = require("./routes/todo")
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const URL = process.env.MONGODB_URL;

mongoose.connect(URL , {
    useUnifiedTopology : true
});

const connection = mongoose.connection;
connection.once("open" , () =>{
    console.log("Mongo DB Connection Succesfull !");
});

// Routes 
app.use("/todo" , todoRouter);


app.listen(PORT , () =>{
    console.log(`Server is up and running on port ${PORT}`)
});

module.exports = app;