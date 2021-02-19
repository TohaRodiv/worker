const { src, dist, TINYPNG_API_KEY } = require ("./../config");
var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');
 
module.exports = function () {
    return gulp.src(src.img.all)
        .pipe(tinypng({
            key: TINYPNG_API_KEY,
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest(dist.img));
};