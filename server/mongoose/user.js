// TODO: Add description

/* ------------------------------------------------------------------------------------------------------------------ */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/* Connect to mongoDB users database */

var Schema = mongoose.Schema;
var userDBName = '/users';
mongoose.Promise = global.Promise;
var userDB = mongoose.createConnection('mongodb://cloud-vm-45-124.doc.ic.ac.uk:27017' + userDBName);
// var userDB = mongoose.createConnection('mongodb://localhost:27017' + userDBName);

// TODO: Add validation

/* Handling connection errors */

userDB.on('error', console.error.bind(console, 'Cannot connect to userDB:'));
userDB.once('open', function() {
    console.log('User DB Active');
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Initialise the exported modules */

var exports = module.exports = {};

/* Setters for the fields */

function toLower (v) {
    return v.toLowerCase();
}

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type : String ,
        unique : true,
        required : true
    },
    email: {
        type: String,
        set: toLower
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: Date
    }
});

/* Plugin that validates unique entries */
userSchema.plugin(uniqueValidator);

/* Helper methods on the userSchema */

/* Prints the fields of a User
* Parameters:
*   none
* Returns:
*   none */
userSchema.methods.debugPrinting = function() {
    return 'name: ' + this.name + ', email: ' + this.email + ', password: ' + this.password +
        ', time: ' + this.time + ', username ' + this.username;
};

/* Pre save function [AUTORUN]
 * Used to initialise fields upon saving
 * */
userSchema.pre('save', function(next) {
    this.time = Date.now();

    // TODO: Handle checks before invoking next
    // Next can be invoked with an error to make it cascade through
    // i.e. new Error('something went wrong')
    next();
});

/* ------------------------------------------------------------------------------------------------------------------ */

var User = userDB.model('User', userSchema);

/* Creates and returns a new database entry
* Parameters:
*   n = name
*   e = email
*   p = password
* Returns:
*   new User instance */
exports.createNewUser = function (n, e, p, u) {
    return new User({
        name : n,
        email : e,
        password : p,
        username: u
    });
};

/* Saves the current User onto the DB
 * Parameters:
 *   user
 * Returns:
 *   Promise */
exports.saveUser = function (user) {
    return user.save(function (err) {
        if (err) console.log('Error while saving.');
        else console.log('Success while saving.');
    });
};

/* Retrieves one User from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.find = function (p) {
    return User.findOne(p, function(err,obj) {
        if (err) console.log('Error while finding.');
        else console.log('Success while finding.');
    });
};

/* Retrieves multiple Users from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.findMultiple = function (p) {
    return User.find(p, function(err,obj) {
        if (err) console.log('Error while finding');
        return obj;
    }).then(function (users) {
        if (!users.length) throw new Error('Error while finding');
        else return users;
    });
};

/* Removes a single User from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.removeUser = function (p) {
    return User.find(p, function(err,obj) {
        if (err) console.log('Error while finding (upon removing)');
        return obj;
    }).then(function (users) {
        if (users.length) {
            return User.remove(users[0], function (err, obj) {
                if (err) console.log('Error while removing (upon finding)');
                return obj;
            }).then();
        }
        else throw new Error('Error while removing');
    });
};

/* Removes multiple Users from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.removeMultiple = function (p) {
    return User.find(p, function(err,obj) {
        if (err) console.log('Error while finding (upon removing)');
        return obj;
    }).then(function (users) {
        if (users.length) {
            for (var i = 0; i < users.length; i++) {
                User.remove(users[i], function (err, obj) {
                    if (err) console.log('Error while removing (upon finding)');
                    return obj;
                }).then();
            }
        }
        else throw new Error('Error while removing');
    });
};

/* Export the User model */
exports.userModel = User;

