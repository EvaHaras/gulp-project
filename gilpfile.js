const { src, dest, watch, parallel, series } = require('gulp');
const fileinclude = require('gulp-file-include');
const webpHtml = require('gulp-webp-html-nosvg');
const cleanCss = require('gulp-clean-css');
const webpCss = require('gulp-webpcss');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');


function html() {
  return src(['src/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      baseDir: 'src/html/includes'
    }))
    .pipe(webpHtml())
    .pipe(dest('dist'));
}

function css() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(cleanCss())
    .pipe(dest('dist/css'));
}


function js() {
  return src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function images() {
    return src('src/img/original/**/*.{jpg,png}')
      .pipe(webp()) // Convert to WebP format (optional)
      .pipe(imagemin()) // Optimize image size
      .pipe(dest('dist/img/optimized'));
  }
