

module.exports = (dept) => {
    return function(req, res, next){
        console.log('from check role', req.user)
       if(req.user.department && req.user.department.includes(dept) ) {
            next();
       } else {
           res.status(403).json({you: `don't have permission`})
       }
    }
}