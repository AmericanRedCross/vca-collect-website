var fs = require('fs');
var babyparse = require('babyparse');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var settings = require('./settings.js');

var file = path.join(settings.app.db);
fs.existsSync(file);
var db = new sqlite3.Database(file);

var d3 = require("d3");

fs.readFile('./_data/db-start.csv', 'utf8', function(err, data) {
  if(err) { console.log(err); }
  var documents = d3.csvParse(data, function(d){
    for(var key in d) {
      d[key] = d[key].replace(/'/g,"''")
    }
    return d
  })
  db.serialize(function(){
    for (var i = 0; i < documents.length; i++) {
        var valueArray = [];
        for(var key in documents[i]){
          valueArray.push(documents[i][key])
        }
        db.run("INSERT INTO documents (published,filename,type,iso3,country,title,community,year,lang,language,descriptionlocal,descriptionen,bytes,lat,lng,comments) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", valueArray, function(err){ console.log(err)});
    }

  })
});

    // db.all('Pragma table_info(documents)', function(err, rows) {
    //   if(err) { console.log(query); console.log(err); }
    //   console.log(rows)
    // })
//
// var testquery = "INSERT INTO documents﻿ (﻿filename,type,iso3,country,title,community,year,lang,descriptionlocal,description,bytes,lat,lng,comments) VALUES ('AF_BFA_KOUR.pdf','VCA/POA','BFA','Burkina Faso','EVC et PDA/VCA and POA du Kouritbilyargo','Kouritbilyargo, Kouritenga','2010','fr','Le EVC a révélé des problèmes d''eau et d''assainissement, l''isolement de la communauté et des problèmes de dégradation des sols.','The VCA revealed water and sanitation issues, isolation of the community, and soil degradation issues.  ','1011462','','','')"

// var testquery = "INSERT INTO documents (﻿filename,type,iso3,country,title,community,year,lang,descriptionlocal,description,bytes,lat,lng,comments) VALUES ('AF_BFA_KOUR.pdf','VCA/POA','BFA','Burkina Faso','EVC et PDA/VCA and POA du Kouritbilyargo','Kouritbilyargo, Kouritenga','2010','fr','Le EVC a révélé des problèmes d''eau et d''assainissement, l''isolement de la communauté et des problèmes de dégradation des sols.','The VCA revealed water and sanitation issues, isolation of the community, and soil degradation issues.  ','1011462','','','')"
// var testquery = "INSERT INTO documents (filename,type,iso3,country,title,community,year,lang,descriptionlocal,description,bytes,lat,lng,comments) VALUES ('','','','','','','','','','','','','','')"
// // var testquery = "INSERT INTO documents ( filename ) VALUES ('yep');"

// db.run(testquery, function(err){
//   console.log("fuck")
//   console.log(err)
// })

// db.all('SELECT * FROM documents', function(err, rows) {
//   if(err) { console.log(query); console.log(err); }
//   console.log(rows)
// });