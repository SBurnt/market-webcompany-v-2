"use strict";

const gulp = require("gulp");
const path = require("path");
const del = require("del");
const less = require("gulp-less");
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync");

// Directory paths
const paths = {
  public: "dist",
  jade: {
    base: "**/*.pug",
    src: "src/*.pug",
    dist: "dist",
    data: "./src/_data/es/index.pug.json",
  },
  less: {
    base: "src/assets/css",
    src: "src/assets/css/*.less",
    dist: "dist/css",
    clean: "dist/css/*",
  },
  js: {
    base: "src/assets/js/*.js",
    src: ["src/assets/js/*.js", "!src/assets/js/*.min.js"],
    dist: "dist/js",
    clean: "dist/js/*",
  },
  images: {
    src: "src/assets/img/**/*",
    dist: "dist/img",
    clean: "dist/img/*",
  },
  fonts: {
    src: "src/assets/fonts/**/*",
    dist: "dist/fonts",
    clean: "dist/fonts/*",
  },
  plugins: {
    src: "src/assets/plugins/**/*",
    dist: "dist/plugins",
    clean: "dist/plugins/*",
  },
};

// De-caching function for Data files
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}

// Configure static server with BrowserSync
// and wait for Sass, Jade and Scripts tasks to launch it.
gulp.task(
  "browser-sync",
  ["less", "jade", "scripts", "images", "fonts", "plugins"],
  () => {
    browserSync.init({
      server: {
        baseDir: paths.public,
        browser: ["google chrome"],
      },
      port: 8000,
    });
  }
);

// Reload browser
gulp.task("bs-reload", () => {
  browserSync.reload();
});

// Compile .jade files and pass in data from json file
// matching file name. index.jade - index.jade.json
gulp.task("jade", () => {
  gulp
    .src(paths.jade.src)
    .pipe($.plumber())
    .pipe(
      $.data(function (file) {
        return requireUncached(paths.jade.data);
      })
    )
    .pipe(
      $.pug({
        pretty: true,
      })
    )
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.jade.dist))
    .pipe(browserSync.stream());
});

// Compile Sass into CSS with vendor prefixes – then reload the browser.
gulp.task("less", () => {
  del([paths.less.clean]);
  return gulp
    .src("./src/assets/css/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
      })
    )
    .pipe(gulp.dest(paths.less.dist))
    .pipe(browserSync.stream());
});

// Parse and compress JavaScript files – then reload the browser.
gulp.task("scripts", () => {
  del([paths.js.clean]);
  gulp.src(paths.js.base).pipe(gulp.dest(paths.js.dist));
  gulp
    .src(paths.js.src)
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe($.rename({ suffix: ".min" }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.js.dist))
    .pipe(browserSync.stream());
});

// Optimize and compress images
gulp.task("images", () => {
  gulp
    .src(paths.images.src)
    .pipe($.plumber())
    .pipe($.newer(paths.images.dist))
    .pipe(
      $.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.jpegtran({ progressive: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        //$.imagemin.svgo({plugins: [{removeViewBox: true}]})
      ])
    )
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.images.dist));
});

// fonts

gulp.task("fonts", () => {
  gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dist));
});

gulp.task("plugins", () => {
  gulp.src(paths.plugins.src).pipe(gulp.dest(paths.plugins.dist));
});

// Complete build sequence
gulp.task("build", ["less", "jade", "scripts", "images", "fonts", "plugins"]);

// Launch the BrowserSync static server and watch files for changes
gulp.task("default", ["browser-sync"], () => {
  gulp.watch(paths.less.base + "/**/*.less", ["less"]);
  gulp.watch([paths.jade.base, paths.jade.data], ["jade"]);
  gulp.watch(paths.js.base, ["scripts", "bs-reload"]);

  var imgWatcher = gulp.watch(paths.images.src, ["images"]);

  // One-way sync – When images are deleted
  imgWatcher.on("change", (ev) => {
    if (ev.type === "deleted") {
      del(path.relative("", ev.path).replace("src/", "dist/"));
    }
  });
});
