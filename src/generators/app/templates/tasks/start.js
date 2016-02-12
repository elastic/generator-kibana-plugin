/**
 * Start the kibana server with this plugin included.
 *
 * In essence this is the same as running this from the
 * root of the kibana install:
 *
 * ./bin/kibana --dev --plugin-path=../path/to/plugin
 *
 */

var resolve = require('path').resolve;
var execFileSync = require('child_process').execFileSync;

var pluginDir = resolve(__dirname, '../');
var kibanaDir = resolve(pluginDir, '../kibana');

var cmd = 'bin/kibana';
var args = ['--dev', '--plugin-path', pluginDir];
execFileSync(cmd, args, {
  cwd: kibanaDir,
  stdio: 'inherit'
});
