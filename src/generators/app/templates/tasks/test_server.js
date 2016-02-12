/**
 * Run the server tests using mocha
 *
 * ## writing tests
 * Server tests are writen just like browser tests, they
 * are just executed differently.
 *
 *  - place tests near the code they test, in __tests__
 *  	directories throughout the server directory
 *  - Use the same bdd-style `describe()` and `it()`
 *  	api to define the suites and cases of your tests.
 *
 *        describe('some portion of your code', function () {
 *          it('should do this thing', function () {
 *            expect(true).to.be(false);
 *          });
 *        });
 *
 * ## running the tests
 * Running the server tests is simple, just execute `npm run test:server`
 * in your terminal and all of the tests in your server will be run.
 *
 * ## focus on the task at hand
 * To limit the tests that run add `.only` to your `describe()`
 * or `it()` calls:
 *
 *      describe.only('suite name', function () {
 *        // ...
 *      });
 *
 */

var resolve = require('path').resolve;
var execFileSync = require('child_process').execFileSync;

var pluginDir = resolve(__dirname, '..');
var kibanaDir = resolve(pluginDir, '../kibana');
var mochaSetupJs = resolve(kibanaDir, 'test/mocha_setup.js');

var cmd = 'mocha';
var args = ['--require', mochaSetupJs, 'server/**/__tests__/**/*.js'];
execFileSync(cmd, args, {
  cwd: pluginDir,
  stdio: 'inherit'
});
