keymetrics-phabricator-gateway
==============================

Turns [Keymetrics](http://keymetrics.io) errors and exceptions into new tasks in [Phabricator](http://phabricator.org) using Keymetrics custom integration hook.

Requirements
------------

 - nodejs > 6 or harmony mode

Installation
------------

That's an example installation. For more secure installation check [Settings](#Settings) and [Security](#Security) sections.

1. You should have a phabricator instance with conduit api exposed to the app and the app exposed to the keymetrics so it can post to the hook url.
1. Go to phabricator instance and create a bot user, then create a new conduit API token for it.
1. Choose a project to put the tasks to or create one. Add the bot to the project visible policy, add to members of the project. If you're using Spaces, add the bot to the project spaces as well. Go to `https://your-phabricator.domain.net/api/project.query` and find the project, get it's PHID-PROJ string. you can get several PHIDs and set them as a comma-separated list.
1. git clone the project.
1. Run `KPG_CONDUIT_TOKEN=api-XXXXXXXXXXXXXXXXXXXXXXXXXXXX KPG_CONDUIT_ROOT=http://your-phabricator.domain.net/api/ KPG_TOKEN_VALUE=ALPHANUMERIC_HASH KPG_PROJECT=PHID-PROJ-YYYYYYYYYYYYYYYYYYYY node bin/www`.
1. The app is running and listens on port 3000 on all interfaces.
1. Go to the Keymetrics.io settings and put `https://kpg_address:3000/?token=ALPHANUMERIC_HASH` to webhook integration.

More config options see below.

Settings
--------

Fully configurable through environment variables.

### Required

 * `KPG_CONDUIT_ROOT` is the root URL of your conduit api. So, it should usually look like `http://your-phabricator.domain.net/api/`. **Required**
 * `KPG_CONDUIT_TOKEN` is the value of the bot's conduit token. **Required**
 * `KPG_PROJECT` is the PHID of the project to post tasks to. **Required**
 * `KPG_TOKEN_VALUE` the value of the token to check, it is `ALPHANUMERIC_HASH` from the installation section. Set to some reasonable alphanumeric gibberish string. **Required**

### Optional

 * `NODE_ENV` if set to `production`, debug logs will be suppressed.
 * `KPG_PATH` is the url path the app will listen to, default is empty. No leading slash needed.
 * `KPG_PORT` port to listen to, default is 3000.
 * `KPG_HOST` ip address to bind to, default is empty, so it listens to all interfaces.
 * `KPG_TOKEN_FIELD` in what field to look for `ALPHANUMERIC_HASH`, default is `token`.
 * `KPG_TEMPLATE` is what template for tasks to use, default is `default`. Check `templates/default.js` for examples if you feel like you need another format of phabricator tasks. Put something in `templates/custom.js` and pass `KPG_TEMPLATE=custom` in the run command. `templates/custom*` is in gitignore, so feel free to experiment.
 
Security
--------

It is strongly recommended to put the app behind an https termination server, such as nginx, to encrypt data between keymetrics and the gateway. 
Also I hope you have your phabricator instance behind an https also.

Set up `KPG_HOST` so it will listen to e.g. `127.0.0.1`, so it won't accept outer connections.

`KPG_PATH`, `KPG_TOKEN_FIELD` and `KPG_TOKEN_VALUE` is how you protect from unauthorized requests, the app won't start if `KPG_TOKEN_VALUE` is empty.

TODO
----

1. Test several projects
1. pmx instrumentation
1. test usage as a middleware
1. Tests
1. publish as npm module
1. Docker examples
1. Convenience bash start script
1. Some logic to put exceptions to corresponding phabricator projects with policies / assignees

PRs welcome.