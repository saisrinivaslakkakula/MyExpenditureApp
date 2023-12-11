const compression = require("compression");
const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./db/db")
const path = require('path')
const _dirname = path.resolve();
//const cors = require("cors");
dotenv.config({path: _dirname+'/config.env'})
const app = express();
//for gzip compression
app.use(compression({ threshold: 0 }));
//routes
const authRoutes = require('./routes/authRoute')
const budgetRoutes = require("./routes/budgetRoute")
const tokenVerificationMiddleware = require("./middleware/tokenVerificationMiddleware");
connectDB(process.env.MONGO_URI)
const PORT = process.env.PORT || 80;
// const MONGO_URL = "mongodb://root:rootpassword@127.0.0.1:27017";


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.json());


app.use("/api/v1/user", authRoutes);
app.use("/api/v1/budget", tokenVerificationMiddleware, budgetRoutes);



if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname,'/frontend/build')))

  app.use("*", (req,res)=> {
    res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
  })
}
