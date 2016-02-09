import gulp from 'gulp';
import gulpif from 'gulp-if';
import { obj as combine } from 'stream-combiner2';
import through2 from 'through2';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import { resolve, relative } from 'path';
import gutil from 'gulp-util';
import del from 'del';

export function ifJsSource(...then) {
  return gulpif(
    file => {
      if (file.path.match(/[\\\/]templates[\\\/]/)) return false;
      if (file.path.match(/\.jsx?$/)) return true;
      return false;
    },
    ...then
  );
}

export function outputPath(file) {
  return resolve(__dirname, 'lib', file.relative);
}

export function ifUnlinkEvent(...then) {
  const unlinkEvent = ({ event }) => event === 'unlink' || event === 'unlinkDir';
  return gulpif(unlinkEvent, ...then);
}

export function log(...preamble) {
  return through2((file, enc, cb) => {
    if (file.isDirectory()) return cb();
    gutil.log(...preamble, relative(process.cwd(), outputPath(file)));
    cb(null, file);
  });
}

export function removeOutput() {
  return combine([
    through2.obj((file, enc, cb) => {
      del(outputPath(file))
      .then(() => cb(null, file))
      .catch(err => cb(err));
    }),
    log(gutil.colors.red('d'))
  ]);
}

export function transpile() {
  return combine([
    sourcemaps.init(),
    babel(),
    sourcemaps.write(),
    toLib(),
  ]);
}

export function toLib() {
  return gulp.dest('lib');
}

export function reTranspile() {
  return combine([
    transpile(),
    log(gutil.colors.green('✔'))
  ]);
}
