var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var babyparse = require('babyparse');
var path = require('path');
var settings = require('./settings.js');


// initialize database
var file = path.join(settings.app.db);
var db = new sqlite3.Database(file);

db.run('DROP TABLE IF EXISTS countries');

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
              values.push(countries[i][key].replace(/'/g,"''"));
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