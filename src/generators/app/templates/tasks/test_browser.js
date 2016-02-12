/**
 * Run the browser tests in a real web browser
 *
 * Under the covers this command is running the `test:dev`
 * task in the kibana repo. That task:
 *  - starts a version of the kibana server that builds a
 *  	test bundle (and only a test bundle)
 *  - runs karma to execute the test bundle in a fresh browser
 *  	version
 *
 * This new browser instance will open once the tests are ready
 * to execute, and the tests can be started by clicking the "DEBUG"
 * button up in the big green bar (you'll know it when you see it).
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
