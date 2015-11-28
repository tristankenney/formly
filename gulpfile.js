var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpTsConfig = require('gulp-tsconfig');

var BUILD = 'build/';

gulp.task('concat', function() {
    return gulp.src(mainBowerFiles())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(BUILD))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(BUILD));
});

gulp.task('tsconfig', function() {
    var tsConfig = gulpTsConfig({
        tsOrder: [
            '**/app.module.ts',
            '**/*.module.ts',
            '**/*.ts'],
        tsConfig: {
            "compilerOptions": {
                "target": "ES5",
                "removeComments": true,
                "sourceMap": true,
                "noImplicitAny": true,
                "out": "./build/app.js"
            }
        }
    });

    return gulp.src(["./**/*.ts"])
        .pipe(tsConfig())
        .pipe(gulp.dest('.'));

    // --> result is a tsconfig.json file.
});
