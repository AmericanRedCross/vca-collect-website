var settings = require('./settings.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var sqlite3 = require('sqlite3');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const saltRounds = 10;

// initialize users database
var file = path.join(settings.app.db);
fs.existsSync(file);
var db = new sqlite3.Database(file);
db.run('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT )', function(err){
    // if(err)
    bcrypt.hash(settings.app.defaultpass, saltRounds, function(err, hash) {
      db.run('INSERT INTO users ( username, password ) VALUES( ?, ? )', settings.app.defaultuser, hash, function(err){
        // if(err)
      });
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
  db.get('SELECT password FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    bcrypt.compare(password, row.password, function(err, res) {
      if(!res) return done(null, false);
      db.get('SELECT username, id FROM users WHERE username = ?', username, function(err, row) {
        return done(null, row)
      });
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});

var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

// bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/',function (req,res) {
	res.render('home',{
		opts: settings.website
	});
})

app.post('/login', passport.authenticate('local', { successRedirect: '/good-login',
                                                    failureRedirect: '/bad-login' }));

app.post('/user', function(req,res){
  // if (req.user) {
		createUser(req,res);
	// } else {
	// 	// ..
	// }
});

var createUser = function(req,res) {
  var username = req.body.username;
  db.get('SELECT username FROM users WHERE username = ?', username, function(err, row) {
    if(err) { console.log(err); };
    if(row) {
      console.log("already a user with that name");
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run('INSERT INTO users ( username, password ) VALUES( ?, ? )', username, hash, function(err){
          // if(err)
          if(this.lastID){
            res.send("inserted with id: " + this.lastID)
          } else {
            // something went wrong?
          }
        });
      });
    }
  });
}

app.listen(settings.app.port, function () {
  console.log('app listening on port ' + settings.app.port)
})
