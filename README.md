### vca-collect-website

- clone the git repository
- `sudo npm install` to get all the node modules
- adjust settings.js for your deployment
- install [PM2](https://github.com/Unitech/pm2) `sudo npm install pm2 -g`
  - other tools will let you keep the application up and running on your server (e.g. [Forever](https://github.com/foreverjs/forever))
  - to have the app restart itself after a reboot, server downtime, etc., you can generate a startup script... check the [PM2 documentation](https://github.com/Unitech/pm2#startup-script-generation) on this for more details
- `pm2 start app.js`
- login (user: me / pass: 123), create a new user, and delete the default

#### TODO
- switch to foundation (or bootstrap?) from MDL
  - http://foundation.zurb.com/templates.html
  - http://foundation.zurb.com/sites/docs/responsive-navigation.html
- main page content
- document search page
- api to deliver document for download
- multi-language support ? https://github.com/mashpie/i18n-node ? https://gist.github.com/mashpie/5246334 ?
  - brainstorm how to make it not impossible to transition to multi-language
    - content. flash messages? country names?
  - extended url should also be language specific
- backup of document metadata (write a csv and save it to S3? just save a copy of the sqlite db to S3?f)
- click on a row to edit instead of needing to click the icon?
- allow changing the filename?
- delete a document (keep records of deletions and a copy of all uploaded documents?)
- adjustments
  - clean up CSS
  - clean up templates
  - tune screen size style break
  - resolution of ifrc logo
- in the documents table, trim the description when not in the edit modal?
- for viz stuff, get logos of all NS?
- allow edit of user passwords?
