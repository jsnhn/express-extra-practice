module.exports = function(req, res, next) { //next is usually used in middleware to keep things going
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google')
}// if you are not logged in you are redirected ot log in