import * as gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
const sass = gulpSass(dartSass);

// Paths
const paths = {
  scss: {
    src: "./src/app/scss/index.scss",
    dest: "./src/app/css",
  },
};

// Compile SCSS

export const compileScss = () => {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" } as any).on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scss.dest));
};

// Watch for changes

export const watchFiles = () => {
  gulp.watch(paths.scss.src, compileScss);
};

// Default task
export default gulp.series(compileScss, watchFiles);
