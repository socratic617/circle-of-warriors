module.exports = function(app, passport, db) {

   const {ObjectId} = require('mongodb');//my string JOURNAL ID(from monogoDB) needs to be converted into an object aka "{ObjectId}""
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


        // MY JOURNALS ENTRIES SECTION =========================
    app.get('/my-journals', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('my-journals')
        db.collection('journal-entry').find().toArray((err, result) => {
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
        db.collection('journal-entry').find().toArray((err, result) => {
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


  // =============================================================================
  // COMMUNITY PAGE ENDPOINT ==================================================
  // =============================================================================

    // Get journal entries =========================
    app.get('/community-page', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
        db.collection('journal-entry').find().toArray((err, result) => {
          console.log("I AM HERE IN COMMUNITY PAGE (GET)")
          console.log(result)
          if (err) return console.log(err)
          res.render('community-page.ejs', {
            user : req.user,//showcases there usr name when logged in
            entries: result
          })
        })
    });

    app.put('/community-page', (req, res) => {
  
      console.log(" (put method) : ")
      console.log(req.body)


      db.collection('journal-entry')
      .find({_id: ObjectId(req.body.id)})
      .toArray((err, result) => {
          if (err) return console.log(err)
          console.log("result : ", result)

          console.log(result[0].reactions[req.body.loggedInUserId])

          if(result[0].reactions[req.body.loggedInUserId] !== undefined){
            console.log('i need to remove the user id  ')
            delete result[0].reactions[req.body.loggedInUserId]; //credit: https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
            //im removing the star if I dont want to star it 

          }
          else{
            console.log('i need to add user id  ')
            result[0].reactions[req.body.loggedInUserId] = true; //this is how im adding star fav to post 
            console.log(result[0].reactions)
          }
          
          db.collection('journal-entry')
          .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
            $set: {
              reactions: result[0].reactions,
            }
          }, {
            sort: {_id: -1},
            upsert: true
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          })
        })
    })

    app.delete('/community-page', (req, res) => {
      console.log("delete method" , req.body)
      db.collection('journal-entry').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Entry deleted!')
      })
    })


  // =============================================================================
  // JOURNAL ENTRY PAGE ENDPOINT ==================================================
  // =============================================================================

    /* Get Journal Entry Page and relevant data from DB */
    app.get('/journal-entry', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
      console.log('journal-entry')
        db.collection('journal-entry').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('journal-entry.ejs', {
            user : req.user//showcases there usr name when logged in
          })
        })
    });


    // POST JOURNAL ENTRY
     app.post('/journal-entry', (req, res) => {
      console.log("(PUT /journal-entry) : ")
      console.log(req.body)
      db.collection('journal-entry').save(
        {
          'entry-date': req.body['entry-date'], 
          'fatigue-entry': req.body['fatigue-entry'], 
          mood: req.body.mood, 
          treatment: req.body.treatment, 
          image: req.body.image,
          description: req.body.description,
          creatorId: req.body.creatorId,
          reactions: {},
          'warrior-name': req.body['warrior-name'],
          'warrior-status': req.body['warrior-status'],
          'caregiver-patient-name': req.body['caregiver-patient-name'],
          'caregiver-patient-status': req.body['caregiver-patient-status'],
          'relationship-type': req.body['relationship-type'],
          'cancer-type' : req.body['cancer-type'],
          'lang-type' : req.body['lang-type']
        }, 
        (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/journal-entry')
      })
    })


// // message board routes ===============================================================

//     app.post('/messages', (req, res) => {
//       db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
//         if (err) return console.log(err)
//         console.log('saved to database')
//         res.redirect('/community-page')
//       })
//     })

//     app.put('/messages', (req, res) => {

//       let startCounterThumbUp = 0;

//       console.log(" (put method) : ")
//       console.log(req.body.thumbUp)
//       if(req.body.thumbUp !== undefined){
//       console.log("thumb up selected")
//       startCounterThumbUp  = req.body.thumbUp == null ? 0 : req.body.thumbUp + 1;//ternary deals with like to handle "NaN" aka null in JS deal with it by adding 1 to it or setting the new list item to 0
    
//     } else if(req.body.thumbDown !== undefined ){

//       console.log("thumb down(before): " + req.body.thumbDown)
//       startCounterThumbUp = req.body.thumbDown == null ? 0 : req.body.thumbDown - 1;
//       console.log("thumb down(after): " + startCounterThumbUp)

//    //ternary deals with dislike to handle "NaN" aka null in JS deal with it by subtract 1 to it or setting the new list item to 0
//       console.log("user selected thumb down");
//     }
//       db.collection('messages')
//       .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//         $set: {
//           thumbUp:startCounterThumbUp,
//         }
//       }, {
//         sort: {_id: -1},
//         upsert: true
//       }, (err, result) => {
//         if (err) return res.send(err)
//         res.send(result)
//       })
//     })

//     app.delete('/messages', (req, res) => {
//       console.log("delete method")
//       db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//         if (err) return res.send(500, err)
//         res.send('Message deleted!')
//       })
//     })

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
