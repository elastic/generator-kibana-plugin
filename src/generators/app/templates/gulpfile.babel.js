import gulp from 'gulp';
import _ from 'lodash';
import path from 'path';
import gutil from 'gulp-util';
import mkdirp from 'mkdirp';
import Rsync from 'rsync';
import Promise from 'bluebird';
import eslint from 'gulp-eslint';
import del from 'del';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import fs from 'fs';

import pkg from './package.json';

const packageName = pkg.name  + '-' + pkg.version;

// relative location of Kibana install
const pathToKibana = '../kibana';
const buildDir = path.resolve(__dirname, 'build');
const targetDir = path.resolve(__dirname, 'target');
const buildTarget = path.resolve(buildDir, pkg.name);
const kibanaPluginDir = path.resolve(__dirname, pathToKibana, 'installedPlugins', pkg.name);

const include = [
  'package.json',
  'index.js',
  'node_modules',
  'public',
  'webpackShims',
  'server'
];

const exclude = [
  'gulpfile.js',
  '.eslintrc'
];

Object.keys(pkg.devDependencies).forEach(function (name) {
  exclude.push(path.join('node_modules', name));
});

function syncPluginTo(dest, done) {
  mkdirp(dest, function (err) {
    if (err) return done(err);

    const source = path.resolve(__dirname) + '/';
    const rsync = new Rsync();

    rsync.source(source)
    .destination(dest)
    .flags('uav')
    .recursive(true)
    .set('delete')
    .include(include)
    .exclude(exclude)
    .output(function (data) {
      process.stdout.write(data.toString('utf8'));
    });

    rsync.execute(function (err) {
      if (err) {
        console.log(err);
        return done(err);
      }

      done();
    });
  });
}

gulp.task('sync', function (done) {
  syncPluginTo(kibanaPluginDir, done);
});

gulp.task('lint', function (done) {
  const filePaths = [
    'gulpfile.js',
    'server/**/*.js',
    'public/**/*.js',
    'public/**/*.jsx',
  ];

  return gulp.src(filePaths)
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.formatEach())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function () {
  gutil.log(gutil.colors.red('Nothing to test...'));
});

gulp.task('clean', function () {
  return del([buildDir, targetDir]);
});

gulp.task('build', ['clean'], function (done) {
  syncPluginTo(buildTarget, done);
});

gulp.task('package', ['build'], function (done) {
  return gulp.src(path.join(buildDir, '**', '*'))
    .pipe(tar(packageName + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest(targetDir));
});

gulp.task('dev', ['sync'], function (done) {
  gulp.watch(['package.json', 'index.js', 'public/**/*', 'server/**/*'], ['sync', 'lint']);
});
