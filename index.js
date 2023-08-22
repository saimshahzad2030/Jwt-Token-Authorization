const express = require('express');
const connectDb = require("./db/db")
const routes = require('./routes/userRoutes')
require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 5000
connectDb()
const app = express();


app.use("/mainApp",routes);


app.listen(port,()=>{
  console.log(`App is responding to: localhost:${port}`);
})