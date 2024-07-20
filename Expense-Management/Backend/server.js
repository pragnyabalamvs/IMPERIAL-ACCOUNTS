const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const chalk = require('chalk');
const mongoose = require('mongoose');
const path = require("path");

// config dot env file
dotenv.config();

//databse call
mongoose.connect( 'mongodb://localhost:27017/Expense', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log(chalk.blue('Database Connected'));
}).catch( (err) => {
    console.log(chalk.red('Database Not Connected' + err));
});

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = 5000 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
