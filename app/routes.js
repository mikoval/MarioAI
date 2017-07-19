var Level = require('./models/level');
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('login.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/home', isLoggedIn, function(req, res) {

        Level.find({}, function(err, levels){
            res.render('home.ejs', {
                user : req.user,
                levels : levels

            })

        })

        
    });
    app.post('/home', isLoggedIn, function(req, res) {

        var param = req.body;
        var level = new Level();
        
        level.width = param.width;
        level.name = param.name;
        level.height = param.height;

        
        level.save(function(){
            Level.find({}, function(err, levels){
                res.json(levels);
            });
        });
        
     
    });
    app.delete('/home', isLoggedIn, function(req, res) {

        var param = req.body.id;
      
        console.log(param);

        Level.findByIdAndRemove(param, function(){
            Level.find({}, function(err, levels){
                res.json(levels);
            });
        });
        
     
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

   
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    })
}