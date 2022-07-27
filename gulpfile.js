const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task( 'clean', () => {
    return src( 'dist/**/*', { read: false }).pipe( rm() );
  });

task('copy:html', () => {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(reload({ stream: true }));
});

task('copy:js', () => {
    return src('src/scripts/**/*')
        .pipe(dest('dist/scripts'))
        .pipe(reload({ stream: true }));
});

task('copy:img', () => {
    return src('src/img/**/*')
        .pipe(dest('dist/img'))
        .pipe(reload({ stream: true }));
});

task('copy:video', () => {
    return src('src/video/**/*')
        .pipe(dest('dist/video'))
        .pipe(reload({ stream: true }));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/css/main.scss'
   ];

task('styles', () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'dev',autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          })))
        .pipe(gulpif(env === 'prod',cleanCSS()))
        .pipe(gulpif(env === 'dev',sourcemaps.write()))
        .pipe(dest('dist/css'))
        .pipe(reload({ stream: true }));
});


task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/css/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/video/.mp4', series('copy:video'));
    watch('./src/scripts/*.js', series('copy:js'));
});

task("default", series("clean", 
parallel("copy:html", "copy:js", "copy:video","copy:img","styles"), 
parallel('watch', 'server')))

task('build',
 series(
   'clean',
   parallel('copy:html', "copy:js", "copy:img", "copy:video",'styles',))
);