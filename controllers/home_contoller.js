// all functiomn here is accesed by controller
///format- 
// module.exports.actionName = function(req,res){
//    ....
//} // see routers as to how and when to use functions
module.exports.home = function(req,res){
    return res.render('home',{
        title: "Home"
    });
}