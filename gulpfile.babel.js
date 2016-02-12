import gulp from 'gulp';
import watch from 'gulp-watch';
import del from 'del';
import gutil from 'gulp-util';

import {
  ifJsSource,
  outputPath,
  ifUnlinkEvent,
  log,
  removeOutput,
  transpile,
  reTranspile,
  toLib,
} from './gulpfile.helpers';

gulp.task('clean', () => del('lib'));

gulp.task('build', ['clean'], () => {
  return gulp
  .src('src/**', { dot: true })
  .pipe(
    ifJsSource(
      transpile(),
      toLib()
    )
  );
});

gulp.task('dev', ['build'], (cb) => {
  gutil.log('watching "src" and building to "lib"');

  let handler;
  makeHandler();

  watch('src/**/*', function (file) {
    handler.write(file);
  });

  function makeHandler() {
    handler = ifUnlinkEvent(
      removeOutput(),
      ifJsSource(reTranspile(), toLib())
    );

    handler.once('error', function (err) {
      console.error(err.stack);
      handler = makeHandler();
    });
  }
});

gulp.task('default', ['build']);
