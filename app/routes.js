module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // community-page SECTION =========================
    app.get('/community-page', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('community-page.ejs', {
            user : req.user,//showcases there usr name when logged in
            messages: result
          })
        })
    });

    // JOURNAL ENTRY SECTION =========================
    app.get('/journal-entry', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('journal-entry')
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('journal-entry.ejs', {
            user : req.user,//showcases there usr name when logged in
            messages: result
          })
        })
    });

        // MY JOURNALS ENTRIES SECTION =========================
    app.get('/my-journals', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('my-journals')
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('my-journals.ejs', {
            user : req.user,//showcases there usr name when logged in
            messages: result
          })
        })
    });

        // VISUALIZATION SECTION =========================
    app.get('/visualization', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('visualization')
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('visualization.ejs', {
            user : req.user,//showcases there usr name when logged in
            messages: result
          })
        })
    });

        // ACCOUNT SETTINGS SECTION =========================
    app.get('/account-settings', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('account-settings')
        db.collection('account-settings').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('account-settings.ejs', {
            user : req.user,//showcases there usr name when logged in
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/community-page')
      })
    })

    app.put('/messages', (req, res) => {

      let startCounterThumbUp = 0;

      console.log(" (put method) : ")
      console.log(req.body.thumbUp)
      if(req.body.thumbUp !== undefined){
      console.log("thumb up selected")
      startCounterThumbUp  = req.body.thumbUp == null ? 0 : req.body.thumbUp + 1;//ternary deals with like to handle "NaN" aka null in JS deal with it by adding 1 to it or setting the new list item to 0
    
    } else if(req.body.thumbDown !== undefined ){

      console.log("thumb down(before): " + req.body.thumbDown)
      startCounterThumbUp = req.body.thumbDown == null ? 0 : req.body.thumbDown - 1;
      console.log("thumb down(after): " + startCounterThumbUp)

   //ternary deals with dislike to handle "NaN" aka null in JS deal with it by subtract 1 to it or setting the new list item to 0
      console.log("user selected thumb down");
    }
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:startCounterThumbUp,
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      console.log("delete method")
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/community-page', // redirect to the secure community-page section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/community-page', // redirect to the secure community-page section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/community-page');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {// checks to see if user is logged in
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
