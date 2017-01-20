### vca-collect-website

- add AWS crentials info at `~/.aws/credentials`
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
- if using nginx you'll likely need to add `client_max_body_size 50M;` or whatever size value

#### TODO
https://github.com/AmericanRedCross/vca-collect-website/issues/1
