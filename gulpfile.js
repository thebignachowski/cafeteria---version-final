/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/gulpfile.js to edit this template
 */
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css( done ) {
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass( { outputStyle: 'compressed' } ) )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') );

        done();
}

function imagenes(  ) {
    return src('src/img/**/*')
            .pipe( dest('build/img') );
}

function versionWebp() {
    return src('src/img/**/*.{png, jpg}')
            .pipe( webp() )
            .pipe( dest('build/img') );
}

function dev() {  
    watch( 'src/scss/**/*.scss', css );
    watch( '../../../Imagenes+Cafeteria/img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, dev );
