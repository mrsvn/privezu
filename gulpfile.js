const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
concat = require("gulp-concat");
const del = require("del");
const svgSprite = require("gulp-svg-sprite");

gulp.task("styles", () => {
  return gulp
    .src("sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./css/"));
});

gulp.task("clean", () => {
  return del(["css/main.css"]);
});

gulp.task("svgSprite", () => {
  console.log("run");
  return gulp
    .src("img/svg/*.svg") // svg files for sprite
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", //sprite file name
          },
        },
      })
    )
    .pipe(gulp.dest("./svg/"));
});

gulp.task("default", gulp.series(["clean", "svgSprite", "styles"]));

gulp.task("watch", () => {
  gulp.watch("sass/*.scss", (done) => {
    gulp.series(["clean", "svgSprite", "styles"])(done);
  });
});
