Secrets
=======
Web applcation for sharing secrets and information about your community through task-based constraints

Usage
=======
To run this app, download the HTML and javascript files and you are ready to go! visit secrets.ci.northwestern.edu for the live version.

File descriptors:
=======
secretsList.html and includes/secretslist.js: The list of available secrets
-Parse is used to retrieve the secrets from the database and fuse.js is used for filtering

submitSecret.html and includes/secretsubmit.js: The secret submission form
-Secret is stored in Parse

secretPage.html and includes/secretPage.js: The information page for individual secrets
-Secret is identified and queried from parse via URL passed ID

knownSecrets.html and includes/knownSecrets.js: The secrets and submissions page
-all data is queried from parse based on logged in user

login.html and includes/login.js: The login/signup page
-uses parse's signup and signin methods

reset.html and includes/passwordreset.js: The password reset page
uses parse's password reset functionality

index.html: redirects to secretsList.html

includes/logout.js: logout functionality on each page

includes/fuse.js: fuse is used for the secrets list filtering

includes/list.css: styles for the site

includes/parse.js: parse is used as a database for this application

