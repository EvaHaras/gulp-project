import { src, dest, watch, parallel } from 'gulp';
import fileinclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
    
const sass = gulpSass(nodeSass);
import cleanCss from 'gulp-clean-css';
// import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupMedia from 'gulp-group-css-media-queries';
import uglify from 'gulp-uglify';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

// HTML task
function html() {
  return src(['src/*.html'])
    // .pipe(fileinclude({
    //   prefix: '@@',
    //   baseDir: 'src/html/includes'
    // }))
    .pipe(webpHtml())
    .pipe(dest('dist'));
}

// CSS task
function css() {
  return src('src/scss/*.scss')
    .pipe(sass())
    // .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(cleanCss())
    .pipe(dest('dist/css'));
}

// JavaScript task
function js() {
  return src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

// Image task
function images() {
  return src('src/img/**/*.{jpg,png,svg}')
    // .pipe(webp()) // Convert to WebP format (optional)
    // .pipe(imagemin()) // Optimize image size
    .pipe(dest('dist/img/'));
}

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
  return parallel(html, css, js, images)();
}

// Export tasks for use in package.json
export { serve, build, images };
