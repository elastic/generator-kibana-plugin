/**
 * Run the browser tests in a real web browser
 *
 * ## writing tests
 * Browser tests are writen just like server tests, they
 * are just executed differently.
 *
 *  - place tests near the code they test, in __tests__
 *  	directories throughout the public directory
 *  - Use the same bdd-style `describe()` and `it()`
 *  	api to define the suites and cases of your tests.
 *
 *        describe('some portion of your code', function () {
 *          it('should do this thing', function () {
 *            expect(true).to.be(false);
 *          });
 *        });
 *
 * ## starting the test runner
 * Under the covers this command uses the `test:dev`
 * task from kibana. This task sets-up a test runner
 * that will watch your code for changes and rebuild
 * your tests when necessary. You access the test runner
 * through a browser that it starts itself (via Karma).
 *
 * ## running the tests
 * Once the test runner has started you a new browser window
 * should be opened and you should see a message saying "connected".
 * Next to that is a "DEBUG" button. This button will open an
 * interactive version of your tests that you can refresh,
 * inspects, and otherwise debug while you write your tests.
 *
 * ## focus on the task at hand
 * To limit the tests that run you can either:
 *   1. use the ?grep= query string to filter the test cases/suites by name
 *   2. Click the suite title or (play) button next to test output
 *   3. Add `.only` to your `describe()` or `it()` calls:
 *
 *      describe.only('suite name', function () {
 *        // ...
 *      });
 *
 */

var resolve = require('path').resolve;
var execFileSync = require('child_process').execFileSync;

var pkg = require('../package.json');
var pluginDir = resolve(__dirname, '../');
var kibanaDir = resolve(pluginDir, '../kibana');

var kbnServerArgs = [
  '--kbnServer.testsBundle.pluginId', pkg.name,
  '--kbnServer.plugin-path', pluginDir
];

var cmd = 'npm';
var args = ['run', 'test:dev', '--'].concat(kbnServerArgs);
execFileSync(cmd, args, {
  cwd: kibanaDir,
  stdio: 'inherit'
});
