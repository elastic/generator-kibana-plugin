/**
 * Build task
 *
 * Copies files from the source into a zip archive
 * that can be distributed for installation into production
 * kibana instals. The archive includes the non-development
 * npm dependencies and builds itself using raw files in
 * the source directory so make sure they are clean/up to date.
 *
 * The resulting archive can be found at "build/{pkg.name}-{pkg.version}.zip"
 *
 */

var vfs = require('vinyl-fs');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var join = require('path').join;

var pkg = require('../package.json');
var deps = Object.keys(pkg.dependencies || {});
var buildId = `${pkg.name}-${pkg.version}`;

var files = [
  'package.json',
  'index.js',
  '{lib,public,server,webpackShims}/**/*',
  `node_modules/{${ deps.join(',') }}/**/*`,
];

vfs
  .src(files, { base: join(__dirname, '..') })
  .pipe(rename(function nestFileInDir(path) {
    path.dirname = join(buildId, path.dirname);
  }))
  .pipe(zip(`${buildId}.zip`))
  .pipe(vfs.dest('build'));
