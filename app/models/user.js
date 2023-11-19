//how to talk to my user

//load the things we need
var mongoose = require('mongoose');// to be able to talk from client to sevrer
var bcrypt   = require('bcrypt-nodejs');// used for storing/hashing your password for security reasons

// define the schema for our user model
var userSchema = mongoose.Schema({ //mongoose allows you to do ODM object data modeling 

    local             : {
        email         : String,
        password      : String,
        'warrior-name': String,
        'warrior-status': String,
        'caregiver-patient-name': String,
        'caregiver-patient-status': String,
        'relationship-type': String,
        'cancer-type' : String,
        'lang-type' : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
//log in and seeing if its the same on the data base 
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
