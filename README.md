### vca-collect-website

- install [Node and npm](http://nodejs.org/)
- clone the git repository
- `npm install` to get all the node modules
- install [Jekyll](https://jekyllrb.com/docs/installation/)
- install Gulp `npm install -g gulp`
- compile sass and build static site with default gulp task `gulp`
  - to watch for changes and have browser sync run use `gulp dev`
- adjust settings.js for your deployment
- install [PM2](https://github.com/Unitech/pm2) `sudo npm install pm2 -g`
  - other tools will let you keep the application up and running on your server (e.g. [Forever](https://github.com/foreverjs/forever))
  - to have the app restart itself after a reboot, server downtime, etc., you can generate a startup script... check the [PM2 documentation](https://github.com/Unitech/pm2#startup-script-generation) on this for more details
- `pm2 start app.js`
- login (user: me / pass: 123), create a new user, and delete the default

#### TODO
- main page content
- style things
  - clean up CSS
  - clean up templates
- document search page
- multi-language support for country names?
- backup of document metadata (write a csv and save it to S3? just save a copy of the sqlite db to S3?f)
- click on a row to edit instead of needing to click the icon?
- allow changing the filename?
- keep records of deletions and a copy of all uploaded documents?
- resolution of ifrc logo
- in the documents table, trim the description when not in the edit modal?
- for viz stuff, get logos of all NS?
- allow edit of user passwords?
