const statSync = require('fs').statSync;
const resolve = require('path').resolve;

const README_URL = 'https://github.com/elastic/generator-kibana-plugin#getting-started';
const KIBANA_DIR = resolve(process.cwd(), '../kibana');

export function checkForKibana(log) {
  // verify that the kibana repository has been setup correctly
  try {
    const stat = statSync(KIBANA_DIR);
    if (!stat.isDirectory()) {
      const err = new Error('not a directory');
      err.code === 'ENOENT';
      throw err;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      log
      .error('Missing Kibana Development Environment')
      .info('Expected location:', KIBANA_DIR)
      .info('See', README_URL);
      console.error('');
      process.exit(1);
    }

    throw err;
  }
}

export function checkNodeVersion(log) {
  // verify that they are using the correct version of node.js
  function stripV(version) {
    return version[0] === 'v' ? version.slice(1) : version;
  }

  var requiredNodeV = stripV(require(resolve(KIBANA_DIR, 'package.json')).engines.node);
  var nodev = stripV(process.version);
  if (requiredNodeV !== nodev) {
    log
      .error('Incorrect Node.js Version')
      .info('Required version:', requiredNodeV)
      .info('Current version:', nodev)
      .info('See', README_URL);
    process.exit(1);
  }
}