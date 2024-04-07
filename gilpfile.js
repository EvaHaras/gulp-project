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
// ... (Previous code remains the same)

// Task for development with browser refresh
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist' // Specify the output directory
    }
  });

  watch(['src/**/*'], parallel(html, css, js, images)).on('change', browserSync.reload);
}

// Default task for building optimized files
function build() {
  parallel(html, css, js, images);
}

// Export tasks for use in package.json
exports.serve = serve;
exports.build = build;
