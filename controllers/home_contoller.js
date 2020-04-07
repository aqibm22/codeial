// all functiomn here is accesed by controller
///format- 
// module.exports.actionName = function(req,res){
//    ....
//} // see routers as to how and when to use functions
module.exports.home = function(req,res){
    //to see cookies--
    console.log(req.cookies);
    //to change a cookie --
    res.cookie('yoo',90); //yoo is id , 90 is value
    return res.render('home',{
        title: "Home"
    });
}