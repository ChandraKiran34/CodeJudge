const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

//route getting

const authRoutes = require('./routes/authRoutes')

// Middlewares
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth',authRoutes);



// MongoDb connection

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error, ${err}`);
  });