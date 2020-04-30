const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

//used for session cookie after npm install express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//for sass-
const sassMiddleware = require('node-sass-middleware');

//for flash messages - first do npm install connect-flash
const flash = require('connect-flash');
// using our own created middleware.js for flash messages-
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//to use the layout library-
//always place this above the routes as routes require the library
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout-
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//after npm install ejs setup the view engine--
app.set('view engine','ejs');
app.set('views','./views');

// all properties of the session-
// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized : false, // when user is not logged in no need to store infor abt it
    resave : false, // no need to rewrite sesion data without any change
    cookie: {
        maxAge : (1000*60*1000) // in ms
    }, // to keep user logged in even after the server is killed
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// setting up flash after session code as flash require session
app.use(flash());
// using middleware.js
app.use(customMware.setFlash); // the position of such type of statements are imp

//must be placed after passport--
//use express router
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        //or this is how you can concantenate--
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});