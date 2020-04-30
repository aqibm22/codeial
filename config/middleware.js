module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error') // for now there i only success message intialized in users_controller.js
    }
    next();
}