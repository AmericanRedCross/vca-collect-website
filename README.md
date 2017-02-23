## Setup
- add AWS crentials info at `~/.aws/credentials`
- install [Node and npm](http://nodejs.org/)
- clone the git repository
- `npm install` to get all the node modules
- install Gulp `npm install -g gulp`
- compile sass and build static site with default gulp task `gulp`
  - to watch for changes use `gulp dev`
- adjust app variables in settings.js as needed for your deployment
- install [PM2](https://github.com/Unitech/pm2) `sudo npm install pm2 -g`
  - other tools will let you keep the application up and running on your server (e.g. [Forever](https://github.com/foreverjs/forever))
  - to have the app restart itself after a reboot, server downtime, etc., you can generate a startup script... check the [PM2 documentation](https://github.com/Unitech/pm2#startup-script-generation) on this for more details
- `pm2 start app.js`
- login (user: me / pass: 123), create a new user, and delete the default
- if using nginx you'll likely need to add `client_max_body_size 50M;` or whatever size value

### TODO
- https://github.com/AmericanRedCross/vca-collect-website/issues/1
- maybe use helpers to internationalize your Handlebars templates: https://formatjs.io/handlebars/

## Because nothing works and everything is terrible
1. Why is the nav bar partial embedded in every page view file instead of in the main layout file?
  - I need the page name in order to build the language links (so we can keep the user on the same page)
  - I didn't want to pass in as a variable with every route, for example:
  ```
  res.render('home',{
    page: "home",
    ...
  });
  ```
  - express-handlbars should expose the string name of the view passed to `res.render()` in the [metadata](https://github.com/ericf/express-handlebars#metadata) but I could not get that particular value to ever display
  - So I grab the filepath (e.g `/path/to/vca-collect-website/views/home.handlebars`) from the  metadata (that value does show up), and use a subexression helper to strip out the name itself
  - Unfortunately this means I have to put the nav html as a partial in the file of every page (e.g. in `find.handlebars`) and not as part of the one layout (i.e. `main.handlebars`)
