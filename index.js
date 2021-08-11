const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');
//const JWT = require('jsonwebtoken');
const Dotenv = require('dotenv');
const Routes = require('./route');
Dotenv.config();

const app = Express();
app.use(Cors());
app.use(Express.json());

Mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
   })

app.listen(5000, ()=>{console.log("server is listening to port at");})

Routes(app);