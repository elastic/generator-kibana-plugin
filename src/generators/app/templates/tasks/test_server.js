/**
 * Run the server tests using mocha
 *
 * This task simply executes mocha in a node.js environment
 * similar to the kibana server. Test files found inside __tests__
 * directories within the server/ directory will all be loaded up
 * and can define test suites with the BDD-style mocha ui
 *
 *     describe('suite name', function () {
 *       it('meets some condition');
 *     });
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
