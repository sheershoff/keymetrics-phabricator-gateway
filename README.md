keymetrics-phabricator-gateway
==============================

Turns [Keymetrics](http://keymetrics.io) errors and exceptions into new tasks in [Phabricator](http://phabricator.org) using Keymetrics custom integration hook.

Requirements
------------

 - nodejs > 6 or harmony mode

Installation
------------

1. You should have a phabricator instance with conduit api exposed to the app and the app exposed to the keymetrics so it can post to the hook url.
1. Go to phabricator instance and create a bot user, then create a new conduit API token for it.
1. Choose a project to put the tasks to or create one. Add the bot to the project visible policy, add to members of the project. If you're using Spaces, add the bot to the project spaces as well. Go to `https://your-phabricator.domain.net/api/project.query` and find the project, get it's PHID-PROJ string. you can get several PHIDs and set them as a comma-separated list.
1. git clone the project
1. Run `KPG_CONDUIT_TOKEN=api-XXXXXXXXXXXXXXXXXXXXXXXXXXXX KPG_CONDUIT_ROOT=http://your-phabricator.domain.net/api/ KPG_TOKEN_VALUE=ALPHANUMERIC_HASH KPG_PROJECT=PHID-PROJ-YYYYYYYYYYYYYYYYYYYY node bin/www`
1. The app is running and listens on port 3000 on all interfaces
1. Go to the Keymetrics.io settings and put `http(s)://kpg_address:3000/?token=ALPHANUMERIC_HASH` to webhook integration

Settings
--------

Fully setupable through environment variables

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