var settings = require('./settings.js');
var fs = require('fs');
var path = require('path');
var flow = require('flow');
// var queue = require('d3-queue')
var yaml = require('js-yaml');
var crypto = require('crypto');
var sqlite3 = require('sqlite3');
var babyparse = require('babyparse');
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
db.run("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, password TEXT, permissions TEXT )", function(err) {
    if(err) { console.log(err); }
    db.get("SELECT user from users", function(err, row) {
      if(err) { console.log(err); }
      if(!row) {
        bcrypt.hash(settings.app.defaultpass, saltRounds, function(err, hash) {
          db.run("INSERT INTO users ( user, password, permissions ) VALUES( ?, ?, 'admin' )", settings.app.defaultuser, hash, function(err) {
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
  'type TEXT, ' +
  'iso3 TEXT, ' +
  'community TEXT, ' +
  'org TEXT, ' +
  'title TEXT, ' +
  'year INTEGER, ' +
  'size TEXT, ' +
  'filename STRING, ' +
  'description TEXT' + ' )', function(err) { if(err) { console.log(err); } });

  // initialize db table for country list
  db.run('CREATE TABLE IF NOT EXISTS countries ( id INTEGER PRIMARY KEY AUTOINCREMENT, iso3 TEXT, iso2 TEXT, en TEXT, fr TEXT, es TEXT, ns TEXT, zone TEXT )', function(err) {
      if(err) { console.log(err); }
      db.get('SELECT iso3 from countries', function(err, row) {
        if(err) { console.log(err); }
        if(!row) {
          fs.readFile('./_data/countries.csv', 'utf8', function(err, data) {
            if(err) { console.log(err); }
            var parsed = babyparse.parse(data, { header: true });
            var countries = parsed.data;
            for(var i=0, len=countries.length; i<len; i++) {
              var columns = [],
                  values = [];
              for(key in countries[i]) {
                columns.push(key);
                values.push(countries[i][key].replace("'","''"));
              }
              var query = 'INSERT INTO countries ( '+ columns.join(",") + " ) VALUES('" + values.join("','") + "')";
              db.run(query, function(err) {
                if(err) { console.log(err); }
              });
            }
          });
        }
      });
  });

// # DATABASE FUNCTIONS
// ####################

// # DB FUNCTIONS FOR DOC MANAGEMENT
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

// # DB FUNCTIONS FOR USER MANAGEMENT
var createUser = function(req, res) {
  var user = req.body.user;
  var permissions = req.body.permissions;
  db.get('SELECT user FROM users WHERE user = ?', user, function(err, row) {
    // if(err)
    if(row) {
      req.flash('errorMessage', " there is already a user with that name");
      res.redirect('/admin/users');
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run('INSERT INTO users ( user, password, permissions ) VALUES( ?, ?, ? )', user, hash, permissions, function(err) {
          // if(err)
          if(this.lastID) {
            req.flash('successMessage', " user created");
            res.redirect('/admin/users');
          } else {
            req.flash('errorMessage', " something went wrong");
            res.redirect('/admin/users');
          }
        });
      });
    }
  });
}

var deleteUser = function(req, res) {
  if(req.user.id == req.body.id) {
    req.flash('errorMessage', " you can't delete yourself");
    res.redirect('/admin/users');
  } else {
    db.run('DELETE FROM users WHERE id = ?', req.body.id, function(err) {
      if(err) {
        //...
      } else {
        req.flash('successMessage', " user deleted");
        res.redirect('/admin/users');
      }
    });
  }
}

// # hashing the password takes a second
// # need to let it complete before moving on
// # really need a more elegant way to do this...
var updatePassword = function(req, res, cb) {
  if(req.body.password.length == 0) {
    req.flash('successMessage', " password not changed");
    cb(req, res);
  } else {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err) console.log(err)
      req.flash('successMessage', " password updated");
      req.query += "password = '" + hash + "', " ;
      req.runquery = true;
      cb(req, res);
    });
  }
}

var updatePermissions = function(req, res, cb) {
  if(req.user.id == req.body.id && req.body.permissions != "admin") {
    req.flash('errorMessage', " you can't remove your own admin status");
    cb(req, res);
  } else {
    req.query += "permissions = '" + req.body.permissions + "'";
    req.runquery = true;
    cb(req, res);
  }
}

var editUser = flow.define(
  function(req, res) {
    req.runquery = false;
    req.query = "UPDATE users SET ";
    updatePassword(req, res, this);
  }
  ,function(req, res) {
    updatePermissions(req, res, this);
  }
  ,function(req, res) {
    if(req.runquery == true) {
      req.query += " WHERE id = " + req.body.id;
      db.run(req.query, function(err) {
        console.log(req.query)
        if(err) {
          //...
          console.log(err);
          req.flash('errorMessage', " something went wrong");
          res.redirect('/admin/users');
        } else {
          req.flash('successMessage', " user updated");
          res.redirect('/admin/users');
        }
      });
    } else {
      req.flash('errorMessage', " something went wrong");
      res.redirect('/admin/users');
    }
  }
);

var listUsers = function(cb) {
  db.all('SELECT id, user, permissions FROM users', function(err, rows) {
    // if(err)
    cb(rows);
  });
}


// # DB FUNCTIONS FOR MAIN WEBSITE VIZ AND FIND

var queryDb = function(query, cb) {
  db.all(query, function(err, rows) {
    // if err...
    cb(err, rows);
  })
}

var getCountries = function(req, cb) {
  var query = "SELECT * FROM countries";
  db.all(query, function(err, rows) {
    cb(err, rows);
  });
}

var getActiveCountries = function(req, cb ) {
  var query  = "SELECT documents.iso3, countries.iso2, countries.en, COUNT() AS count FROM documents LEFT OUTER JOIN countries ON ( documents.iso3 = countries.iso3 ) GROUP BY documents.iso3";
  db.all(query, function(err, rows) {
    cb(err, rows);
  });
}

var getCommunities = function(req, cb) {
  var query = "SELECT DISTINCT community FROM documents WHERE iso3='" + req.params.iso3 + "'" ;
  db.all(query, function(err, rows) {
    cb(err, rows);
  });
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
  db.get('SELECT id, user, permissions FROM users WHERE id = ?', id, function(err, row) {
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


app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    eq: function(v1,v2,options) {
			if (v1 && v2 && v1.toString() === v2.toString()) {
				return options.fn(this);
			}
			return options.inverse(this);
		}
    ,log: function(context,options) {
			console.log(context);
			return true;
		}
    ,viewname: function(filepath) {
      // assumes extension is `.handlebars`
      return filepath.slice(filepath.lastIndexOf('/') + 1, -11);
    }
  }
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// WEBSITE TRANSLATIONS
// ####################
var english = express.Router();
var spanish = express.Router();

// route middleware that will happen on every request
english.use(function(req, res, next) {
    // Get language strings, or throw exception on error
    try {
      var translation = yaml.safeLoad(fs.readFileSync('./_data/en.yml', 'utf8'));
      req.language = translation;
    } catch (e) { console.log(e); }
    // continue to the route
    next();
});
spanish.use(function(req, res, next) {
    // Get language strings, or throw exception on error
    try {
      var translation = yaml.safeLoad(fs.readFileSync('./_data/es.yml', 'utf8'));
      req.language = translation;
    } catch (e) { console.log(e); }
    // continue to the route
    next();
});

// # HOME
english.get('/', function(req, res) {
	res.render('home',{
    settings: settings.page,
    text: req.language
	});
});
spanish.get('/', function(req, res) {
	res.render('home',{
    settings: settings.page,
    text: req.language
	});
});

// # FIND
english.get('/find', function(req, res) {
	res.render('find',{
    settings: settings.page,
    text: req.language
	});
});
spanish.get('/encontrar', function(req, res) {
	res.render('find',{
    settings: settings.page,
    text: req.language
	});
});

// # SHARE
english.get('/share', function(req, res) {
	res.render('share',{
    settings: settings.page,
    text: req.language
	});
});
spanish.get('/compartir', function(req, res) {
	res.render('share',{
    settings: settings.page,
    text: req.language
	});
});

app.use('/', english);
app.use('/en', english);
app.use('/es', spanish);


// API
// ###
var api = express.Router();

api.get('/documents', function(req, res) {
  // if(req.user) {
    getDocs(req, function(err, data) {
      if(err) { console.log(err); }
      res.json(data);
    });
  // }
});

api.get('/documents/:rowid', function(req, res) {
  if(req.user) {
    getDocsRow(req, function(err, data) {
      if(err) { console.log(err); }
      res.json(data);
    });
  }
});

api.get('/find', function(req, res) {
  var countryQuery = "SELECT DISTINCT(documents.iso3), countries.* from documents INNER JOIN countries ON countries.iso3 = documents.iso3";
  var docsQuery = "SELECT * FROM documents";
  // var q = queue.queue();
  // q.defer(queryDb, countryQuery);
  // q.defer(queryDb, docsQuery);
  // q.await(function(error, countries, docs) {
  //   if (error) console.log(error);
  //   res.json( { docs: docs, countries: countries })
  // });
  flow.exec(
    function() {
      queryDb(countryQuery, this.MULTI('countries'))
      queryDb(docsQuery, this.MULTI('docs'))
    }
    ,function(data) {
      res.json( { docs: data.docs["1"], countries: data.countries["1"] })
    }
  )

});

api.get('/overview', function(req, res) {
  var countryQuery = "SELECT DISTINCT(documents.iso3), countries.* from documents INNER JOIN countries ON countries.iso3 = documents.iso3";
  var docsQuery = "SELECT type, iso3 FROM documents";
  flow.exec(
    function() {
      queryDb(countryQuery, this.MULTI('countries'))
      queryDb(docsQuery, this.MULTI('docs'))
    }
    ,function(data) {
      res.json( { docs: data.docs["1"], countries: data.countries["1"] })
    }
  )
});

api.get('/file/:rowid', function(req, res) {
  var query = "SELECT * FROM documents WHERE rowid = " + req.params.rowid;
  db.get(query, function(err, row) {
    if(row.published === 1) {
      var key = row.filename;
      var params = {
        Bucket: settings.app.s3bucket,
        Key: key
      };
      s3.getObject(params, function(err, data) {
        // if (err) console.log(err, err.stack); // an error occurred
        // else     console.log(data);           // successful response
        if(err) {
          res.json(err, err.stack);
        } else {
          var buffer = Buffer.from(data.Body);
          res.writeHead(200, {
            'Content-Type': data.ContentType,
            'Content-Disposition': "attachment;filename=" + key,
            'Content-Length': data.ContentLength
          });
          res.end(buffer);
        }
      });
    } else {
      res.json("requested document is not published")
    }
  });
});

api.post('/documents/:rowid', function(req, res) {
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

api.get('/countries', function(req, res) {
  getCountries(req, function(err, data) {
    if(err) { console.log(err); }
    res.json(data);
  });
});

api.get('/activecountries', function(req, res) {
  getActiveCountries(req, function(err, data) {
    if(err) { console.log(err); }
    res.json(data);
  });
});

api.get('/communities/:iso3', function(req, res) {
  getCommunities(req, function(err, data) {
    if(err) { console.log(err); }
    res.json(data);
  });
});

app.use('/api', api);

// ADMIN INTERFACE
// ###############
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

app.post('/admin/user', function(req, res) {
  if (req.user && req.user.permissions == "admin") {
    switch(req.body["_method"]) {
      case "DELETE":
        deleteUser(req, res);
      break;
      case "PUT":
        editUser(req, res);
      break;
      default:
        createUser(req, res);
      break;
    }
  } else { res.redirect('/admin/users'); }
});

app.get('/admin', function(req, res) {
		res.render('adminHome',{
      layout: 'admin',
			user:req.user,
			settings: settings.page
		});
});

app.get('/admin/users', function(req, res) {
  if(req.user && req.user.permissions == "admin") {
    listUsers(function(result) {
      res.render('adminUsers',{
        layout: 'admin',
        user:req.user,
        users: result,
        settings: settings.page,
        error:req.flash("errorMessage"),
        success:req.flash("successMessage")
      });
    });
  } else {
    res.redirect('/admin');
  }
});

app.get('/admin/documents', function(req, res) {
  if((req.user && req.user.permissions == "admin") || (req.user && req.user.permissions == "editor")) {
    res.render('adminDocs',{
      layout: 'admin',
      user:req.user,
      settings: settings.page,
      countries: settings.countries,
      error:req.flash("errorMessage"),
      success:req.flash("successMessage")
    });
  } else {
    res.redirect('/admin');
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
  var community = "";
  if(req.body.community === "_new"){
    community = req.body.community_new.replace("'","''");
  } else {
    community = req.body.community;
  }
  var query = "INSERT INTO documents (type, iso3, community, title, year, size, filename, description) VALUES (" +
    "'" + req.body.type.replace("'","''") + "', " +
    "'" + req.body.iso3.replace("'","''") + "', " +
    "'" + community + "', " +
    "'" + req.body.title.replace("'","''") + "', " +
    "'" + req.body.year.replace("'","''") + "', " +
    "'" + formatBytes(req.file.size, 1) + "', " +
    "'" + req.file.key.replace("'","''") + "', " +
    "'" + req.body.description.replace("'","''") + "') ";
    // TODO: make a function to getting string values ready for inclusion in sql queries and figure that out
    console.log(query)
  db.run(query, function(err) {
    if(err) {
      res.json({ type: "error", message: err })
    } else {
      res.json({ type: "success", message: "uploaded with rowid: " + this.lastID })
    }
  });
});



app.listen(settings.app.port, function() {
  console.log('app listening on port ' + settings.app.port);
});
