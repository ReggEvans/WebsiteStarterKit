// ============================================
// Gulp Loader
// ============================================
const { src, dest, task, watch, series, parallel } = require("gulp");

// ============================================
// Dependencies
// ============================================
const sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  plumber = require("gulp-plumber"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  image = require("gulp-imagemin"),
  browserSync = require("browser-sync").create();

// ============================================
// Paths
// ============================================
const paths = {
  html: {
    src: "dev/*.html",
    dest: "build/"
  },
  css: {
    src: "dev/scss/**/*.scss",
    dest: "build/assets/css/"
  },
  js: {
    src: "dev/js/app.js",
    dest: "build/assets/js/"
  },
  image: {
    src: "dev/img/*",
    dest: "build/assets/img/"
  },
  vendor: {
    src: "dev/js/vendors/*.js",
    dest: "build/assets/js/"
  }
};

// ============================================
// Gulp Functions
// ============================================
function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Compile and minify scss
function css() {
  return src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(dest(paths.css.dest))
    .pipe(browserSync.stream());
}

// Uglify js files
function js() {
  return src(paths.js.src)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Concat and Compress Vendor js files
function vendor() {
  return src(["dev/js/vendors/jquery.min.js", "dev/js/vendors/*.js"])
    .pipe(plumber())
    .pipe(concat("vendors.js"))
    .pipe(uglify())
    .pipe(dest("build/assets/js"))
    .pipe(browserSync.stream());
}

// Image Compression
function img() {
  return src(paths.image.src)
    .pipe(image())
    .pipe(dest(paths.image.dest))
    .pipe(browserSync.stream());
}

// Move Font Awesome CSS to build/assets/css
function fa() {
  return src("node_modules/@fortawesome/fontawesome-free/css/all.min.css").pipe(
    dest("build/assets/css/vendors/fontawesome")
  );
}

// ============================================
// Watch!
// ============================================
function watcher() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

  watch(paths.html.src, series(html));
  watch(paths.css.src, series(css));
  watch(paths.js.src, series(js));
  watch(paths.vendor.src, series(vendor));
  watch([
    "build/*.html",
    "build/assets/css/*.css",
    "build/assets/js/*.js",
    "build/assets/js/vendors/*.js"
  ]).on("change", browserSync.reload);
}

// ============================================
// Gulp Tasks
// ============================================
exports.watcher = watcher;
exports.css = css;
exports.html = html;
exports.js = js;
exports.img = img;
exports.fa = fa;

let build = parallel(watcher);
task("build", build);
task("default", build);
task("img", img);
task("fa", fa);
