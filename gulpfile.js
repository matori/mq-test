"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var nodeSass = require("gulp-sass");
var rubySass = require("gulp-ruby-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csswring = require("csswring");

var processors = [
    autoprefixer,
    mqpacker // メディアクエリーまとめる
    //csswring // ミニファイ / いらないコメント消したりする
];

gulp.task("rubySass", function () {

    return rubySass("./src/styles/**/*.scss")
        .on('error', rubySass.logError)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(gulp.dest("./dest/styles/ruby-sass"))
});

gulp.task("nodeSass", function () {

    return gulp.src("./src/styles/**/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(nodeSass())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(gulp.dest("./dest/styles/node-sass"))
});

gulp.task("default", ["rubySass", "nodeSass"]);
