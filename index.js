const express = require("express");
const path = require('path');
const db = require('./config/Database');
const router = require('./routers/blog.router');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const { localAuth } = require("./middleware/userAuth");
// const localStrategy = require('passport-local-strategy');

const app = express();

localAuth(passport)

app.use(cookieParser());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')))
app.use("/uploads/img", express.static(path.join(__dirname, "/uploads/img")));
app.use(router);
app.use(session({secret:"private-key"}));
app.use(passport.session());

app.listen(8000,(err)=>{
    if(err){
        console.log("error starting server");
        return false;
    }
    console.log("http://localhost:8000");
    db();
});