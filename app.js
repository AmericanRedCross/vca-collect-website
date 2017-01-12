var settings = require('./settings.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var sqlite3 = require('sqlite3');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const saltRounds = 10;

// helper functions
var formatBytes = function(bytes, decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// initialize database
var file = path.join(settings.app.db);
fs.existsSync(file);
var db = new sqlite3.Database(file);

// initialize db table for admin users
db.run('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, password TEXT )', function(err) {
    if(err) { console.log(err); }
    db.get('SELECT user from users', function(err, row) {
      if(err) { console.log(err); }
      if(!row) {
        bcrypt.hash(settings.app.defaultpass, saltRounds, function(err, hash) {
          db.run('INSERT INTO users ( user, password ) VALUES( ?, ? )', settings.app.defaultuser, hash, function(err) {
            if(err) { console.log(err); }
          });
        });
      }
    });
});

// initialize db table for documents
db.run('CREATE TABLE IF NOT EXISTS documents ( ' +
  'rowid INTEGER PRIMARY KEY AUTOINCREMENT, ' +
  'published INTEGER DEFAULT 0, ' +
  'country TEXT, ' +
  'title TEXT, ' +
  'year INTEGER, ' +
  'size TEXT, ' +
  'filename STRING, ' +
  'description TEXT' + ' )', function(err) { if(err) { console.log(err); } });

// db functions
var getDocs = function(req, cb) {
  var query = "SELECT * FROM documents";
  db.all(query, function(err, rows) {
      cb(err, rows);
  });
}

var getDocsRow = function(req, cb) {
  var query = "SELECT * FROM documents WHERE rowid = " + req.params.rowid;
  db.get(query, function(err, row) {
      cb(err, row);
  });
}

var updateDocsRow = function(req, res) {
  var query = "UPDATE documents SET ";
  var updates = [];
  for (key in req.body) {
    if(key !== "_method") {
      updates.push(key + " = '" + req.body[key].replace("'","''") + "'" ) // single quotes in a string screw up the sql query
    }
  }
  query += updates.join(", ");
  query += " WHERE rowid = " + req.params.rowid;
  console.log(query);
  db.run(query, function(err) {
    // if(err)
    if(this.changes) {
      req.flash('successMessage', 'Row updated!');
      res.redirect('/admin/documents');
    } else {
      req.flash('errorMessage', 'Apologies, it seems something went wrong.');
      res.redirect('/admin/documents');
    }
  });
}

var createUser = function(req, res) {
  var user = req.body.user;
  db.get('SELECT user FROM users WHERE user = ?', user, function(err, row) {
    // if(err)
    if(row) {
      req.flash('errorMessage', 'There is already a user with that name.');
      res.redirect('/admin/users');
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run('INSERT INTO users ( user, password ) VALUES( ?, ? )', user, hash, function(err) {
          // if(err)
          if(this.lastID) {
            req.flash('successMessage', 'User created!');
            res.redirect('/admin/users');
          } else {
            req.flash('errorMessage', 'Apologies, it seems something went wrong.');
            res.redirect('/admin/users');
          }
        });
      });
    }
  });
}

var deleteUser = function(req, res) {
  if(req.user.user === req.body.user) {
    req.flash('errorMessage', "You can't delete yourself.");
    res.redirect('/admin/users');
  } else {
    db.run('DELETE FROM users WHERE user = ?', req.body.user, function(err) {
      if(err) {
        //...
      } else {
        req.flash('successMessage', 'User deleted!');
        res.redirect('/admin/users');
      }
    });
  }
}

// setting up user authentication
passport.use(new LocalStrategy({ usernameField: 'user' }, function(user, password, done) {
  db.get('SELECT password FROM users WHERE user = ?', user, function(err, row) {
    if (!row) return done(null, false);
    bcrypt.compare(password, row.password, function(err, res) {
      if(!res) return done(null, false);
      db.get('SELECT user, id FROM users WHERE user = ?', user, function(err, row) {
        return done(null, row);
      });
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.get('SELECT id, user FROM users WHERE id = ?', id, function(err, row) {
    if (!row) { return done(null, false); }
    return done(null, row);
  });
});

// setting up the app
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var flash = require('express-flash');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
// bodyParser to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser('secret'));
app.use(session({
  store: new SQLiteStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin'
  }), function(req, res) {
    res.redirect('/admin');
  }
);

app.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/admin');
	})
});

app.get('/', function(req, res) {
	res.render('home',{
		opts: settings.website
	});
});

app.get('/find', function(req, res) {
  db.all('SELECT * FROM documents', function(err, rows) {
    if(err) { console.log(err); }
    res.render('find',{
      opts: settings.website,
      documents: rows
    });
  });
});

app.get('/share', function(req, res) {
	res.render('share',{
		opts: settings.website,
    countries: settings.countries
	});
});

app.get('/admin', function(req, res) {
		res.render('adminHome',{
      layout:'admin',
			user:req.user,
			opts:settings.website
		});
});

app.get('/admin/users', function(req, res) {
  if(req.user) {
    db.all('SELECT user FROM users', function(err, rows) {
      res.render('adminUsers',{
        layout:'admin',
        user:req.user,
        opts:settings.website,
        users:rows,
        error:req.flash("errorMessage"),
				success:req.flash("successMessage")
      });
    });
  } else {
    res.redirect('/admin');
  }
});

app.get('/admin/documents', function(req, res) {
  if(req.user) {
    res.render('adminDocs',{
      layout:'admin',
      user:req.user,
      opts:settings.website,
      countries: settings.countries,
      error:req.flash("errorMessage"),
      success:req.flash("successMessage")
    });
  } else {
    res.redirect('/admin');
  }
});

app.get('/api/documents', function(req, res) {
  if(req.user) {
    getDocs(req, function(err, data) {
      if(err) { console.log(err); }
      res.json(data);
    });
  }
});

app.get('/api/documents/:rowid', function(req, res) {
  if(req.user) {
    getDocsRow(req, function(err, data) {
      if(err) { console.log(err); }
      res.json(data);
    });
  }
});

app.post('/api/documents/:rowid', function(req, res) {
  if(req.user) {
    var method = req.body["_method"].toUpperCase();
    switch(method) {
      case "DELETE":
        deleteDoc(req, res);
        break;
      case "PUT":
        updateDocsRow(req, res);
        break;
      default:
        // ...
        break;
    }
  }
});


var multer  = require('multer');
var multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var moment = require('moment');

var removeFromS3 = function(key, cb) {
  var params = {
    Bucket: settings.app.s3bucket,
    Key: key
  };
  s3.deleteObject(params, function(err, data) {
    // if (err) console.log(err, err.stack);
    // else     console.log(data);
    cb(err, data);
  });
}

var deleteDoc = function(req, res) {
  var rowid = req.params.rowid;
  var selectQuery = "SELECT * FROM documents WHERE rowid = " + rowid;
  db.get(selectQuery, function(err, row) {
    var key = row.filename;
    var deleteQuery = "DELETE FROM documents WHERE rowid = " + rowid;
    db.run(deleteQuery, function(err) {
      if(this.changes) {
        req.flash('successMessage', 'Entry removed from table of records.');
        removeFromS3(key, function(err, data){
          if(err) {
            req.flash('errorMessage', 'Apologies, it seems something went wrong deleting the file from S3 storage.');
            res.redirect('/admin/documents');
          } else {
            req.flash('successMessage', 'File deleted from S3.');
            res.redirect('/admin/documents');
          }
        })
      } else {
        req.flash('errorMessage', 'Apologies, it seems something went wrong removing the entry from the table.');
        res.redirect('/admin/documents');
      }
    });
  });
}

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: settings.app.s3bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      // append upload timestamp to filename
      var filename = file.originalname.substr(0, file.originalname.lastIndexOf('.')) + '_' + moment().format("YYYY-MM-DD_HH-mm-ss") + path.extname(file.originalname);
      cb(null, filename);
    }
  })
});

app.post('/upload', upload.single('vcaFile'), function(req, res) {
  var query = "INSERT INTO documents (title, description, country, year, size, filename) VALUES (" +
    "'" + req.body.title.replace("'","''") + "', " +
    "'" + req.body.description.replace("'","''") + "', " +
    "'" + req.body.country.replace("'","''") + "', " +
    "'" + req.body.year.replace("'","''") + "', " +
    "'" + formatBytes(req.file.size, 1) + "', " +
    "'" + req.file.key.replace("'","''") + "') ";
    // TODO: make a function to getting string values ready for inclusion in sql queries
  db.run(query, function(err) {
    if(err) { console.log(err); }
    res.json({ message: "uploaded with rowid: " + this.lastID })
    // TODO: maybe change this to a flash message instead of the loading icon and whatnot currently used on the share page
  });
});

app.post('/user', function(req, res) {
  if (req.user) {
    switch(req.body["_method"]) {
      case "DELETE":
        deleteUser(req, res);
      break;
      case "PUT":
        // ...
      break;
      default:
        createUser(req, res);
      break;
    }
  } else { res.redirect('/admin'); }
});

app.listen(settings.app.port, function() {
  console.log('app listening on port ' + settings.app.port);
});
