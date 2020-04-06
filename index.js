const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

//to use the layout library-
//always place this above the routes as routes require the library
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout-
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index'));

//after npm install ejs setup the view engine--
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        //or this is how you can concantenate--
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});