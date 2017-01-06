### vca-collect-website

#### to do
- main page content
- document search page
- document upload page
  - store metadata in database
  - send file to S3
  - "published" toggle that changes availability for download
    - deliver files through the app server? or during the toggle process change the S3 location between shared/protected?
- admin section behind login
  - edit/add users
  - approve uploads for download on main page
  - session support stuff ? http://passportjs.org/docs ? https://github.com/expressjs/session ?
- multi-language support ? https://github.com/mashpie/i18n-node ? https://gist.github.com/mashpie/5246334 ?
  - extended url should also be language specific
