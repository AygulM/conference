const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const sel = require('del');
const del = require('del');
const browserSync = require('browser-sync').create();


const styles =() =>{
    return src('src/style/**/*.css')
    .pipe(sourceMaps.init())
    .pipe(concat('main.css'))//перенесли строку
    .pipe(autoprefixer('last 2 versions'))
    // .pipe(cleanCss({
    //     level:2
    // }))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}
const stylesBuild =() =>{
    return src('src/style/**/*.css')
    .pipe(concat('main.css'))//перенесли строку
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCss({
        level:2
    }))    
    .pipe(dest('dist'));
}
const htmlMinify = () =>{
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace:true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}
const htmlDev = () =>{
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace:true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}
const svgSprites = () =>{
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream());
}
const images = () =>{
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.jpeg',
        'src/images/**/*.png',
        'src/images/*.svg'
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
}
const scripts = () =>{
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(sourceMaps.init())
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
        toplevel:true
    }).on('error', notify.onError()))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}
const scriptsBuild = () =>{
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
        toplevel:true
    }).on('error', notify.onError()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}
const resources = () =>{
    return src('src/resources/**')
        .pipe(dest('dist'))
}
const clean = () =>{
    return del('dist')
}
const watchFile = () =>{
    browserSync.init({
        server:{
            baseDir:'dist'
        }
    });
}
watch('src/**/*.html', htmlMinify);
watch('src/style/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch([
    'src/images/**/*.jpg',
    'src/images/**/*.jpeg',
    'src/images/**/*.png',
    'src/images/*.svg'
], images);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources)

exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.resources = resources;
exports.clean = clean;
exports.default = series(clean, styles, htmlDev, svgSprites, images, scripts, resources, watchFile);
exports.build = series(clean, stylesBuild, htmlMinify, svgSprites, images, scriptsBuild, resources, watchFile);