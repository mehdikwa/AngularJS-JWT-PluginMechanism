/* eslint no-var: [0] */

'use strict';

var gulp = require('gulp');
var one = require('one-gulp');
var argv = require('yargs').argv;
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var ngAnnotate = require('gulp-ng-annotate');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var bower = require('main-bower-files');
var jsdoc = require('gulp-jsdoc3');
var path = require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var through2 = require('through2');
var KarmaServer = require('karma').Server;
var execSync = require('child_process').execSync;

one.init(gulp, {
    cssDeps: [
        {
            include: ['bower_components/**/*.css'],
            output: 'bower-styles.css',
        },
        {
            include: ['**/*.css'],
            exclude: ['bower_components/**/*.css'],
            output: 'all-styles.css',
        },
    ],
    jsDeps: [
        {
            include: ['bower_components/**/*.js'],
            output: 'bower-scripts.js',
        },
        {
            include: ['node_modules/**/*.js'],
            output: 'browserify-scripts.js',
        },
        {
            include: [
                '**/*.module.js',
                '**/*.js',
            ],
            exclude: [
                'node_modules/**/*.js',
                'bower_components/**/*.js',
                'extensions/**/*.js',
                'test/**/*.js',
                'docs/**/*',
            ],
            output: 'all-scripts.js',
        },
    ],
});

var ngOne = {
    babel: function () {
        return browserify('./src/app/app.module.js')
            .transform('babelify', { presets: ['es2015'] })
            .bundle()
            .pipe(source('build.js'));
    },

    ngAnnotate: function (ngSources) {
        return ngSources
            .pipe(ngAnnotate());
    },

    ngConstant: function () {
        return gulp.src('./constants.json')
            .pipe(ngConstant({
                name: 'app.core',
                deps: false,
            }))
            .pipe(rename('app/core/constants.js'));
    },

    fonts: function () {
        return one.src.fromExts(one.options.src, ['eot', 'ttf', 'woff', 'woff2']);
    },

    bowerFonts: function () {
        return gulp.src(bower({ filter: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'] }), {
            cwd: path.resolve('.'),
            base: path.resolve('bower_components'),
            nodir: true,
        });
    },

    revFonts: function (files) {
        return files.pipe(rev());
    },

    revImages: function (files) {
        return files.pipe(rev());
    },

    revCssJs: function (files) {
        return files.pipe(rev());
    },

    revFontsReplace: function (files, revvedFiles) {
        return files.pipe(revReplace({
            manifest: revvedFiles.pipe(rev.manifest()),
        }));
    },

    revImagesReplaceCss: function (files, revvedFiles) {
        return files.pipe(revReplace({
            manifest: revvedFiles.pipe(rev.manifest()),
        }));
    },

    revImagesReplaceJs: function (files, revvedFiles) {
        return files.pipe(revReplace({
            manifest: revvedFiles.pipe(rev.manifest()),
        }));
    },
};
one.load(ngOne);

// remove useless CSS stuffs
one.unlink(one.sources.css).from(one.transforms.autoprefix);
one.unlink(one.sources.less).from(one.transforms.less);
one.unlink(one.transforms.less).from(one.transforms.autoprefix);
one.unlink(one.sources.styl).from(one.transforms.stylus);
one.unlink(one.transforms.stylus).from(one.transforms.autoprefix);

// remove useless JS stuffs
one.unlink(one.sources.coffee).from(one.transforms.coffeeScript);
one.unlink(one.transforms.coffeeScript).from(one.transforms.sortJsByDepth);
one.unlink(one.transforms.coffeeScript).from(one.outputs.writeToDev);
one.unlink(one.sources.ts).from(one.transforms.typescript);
one.unlink(one.transforms.typescript).from(one.transforms.sortJsByDepth);
one.unlink(one.transforms.typescript).from(one.outputs.writeToDev);

// remove useless HTML stuffs
one.unlink(one.sources.md).from(one.transforms.markdown);
one.unlink(one.transforms.markdown).from(one.transforms.injectDev);
one.unlink(one.transforms.markdown).from(one.transforms.injectProd);
one.unlink(one.sources.jade).from(one.transforms.jade);
one.unlink(one.transforms.jade).from(one.transforms.injectDev);
one.unlink(one.transforms.jade).from(one.transforms.injectProd);

// Babel + ngAnnotate
one.unlink(one.sources.js).from(one.transforms.sortJsByDepth);
one.unlink(one.sources.js).from(one.outputs.browserSync);

one.link(one.sources.js).to(ngOne.babel);
one.link(ngOne.babel).to(ngOne.ngAnnotate);
one.link(ngOne.ngAnnotate).to(one.transforms.sortJsByDepth);
one.link(ngOne.ngAnnotate).to(one.outputs.writeToDev);

// ngConstant
one.link(ngOne.ngConstant).to(ngOne.ngAnnotate);

// fonts (bower and custom) => rev
one.link(ngOne.fonts).to(one.outputs.writeToProd);
one.link(ngOne.fonts).to(one.outputs.browserSync);
one.link(ngOne.bowerFonts).to(ngOne.revFonts);
one.link(ngOne.revFonts).to(one.outputs.writeToProd);
one.link(ngOne.revFonts).to(ngOne.revFontsReplace, { primary: false });

// image
one.unlink(one.transforms.imagemin).from(one.outputs.writeToProd);
one.link(one.transforms.imagemin).to(ngOne.revImages);
one.link(ngOne.revImages).to(one.outputs.writeToProd);
one.link(ngOne.revImages).to(ngOne.revImagesReplaceCss, { primary: false });
one.link(ngOne.revImages).to(ngOne.revImagesReplaceJs, { primary: false });

// replace revved fonts and revved images in CSS
one.unlink(one.transforms.concatCss).from(one.transforms.minifyCss);
one.link(one.transforms.concatCss).to(ngOne.revFontsReplace);
one.link(ngOne.revFontsReplace).to(ngOne.revImagesReplaceCss);
one.link(ngOne.revImagesReplaceCss).to(one.transforms.minifyCss);

// replace revved images in JS templates (previously html but they have been inlined)
one.unlink(one.transforms.concatJs).from(one.transforms.minifyJs);
one.link(one.transforms.concatJs).to(ngOne.revImagesReplaceJs);
one.link(ngOne.revImagesReplaceJs).to(one.transforms.minifyJs);

// rev JS/CSS
one.unlink(one.transforms.minifyCss).from(one.outputs.writeToProd);
one.unlink(one.transforms.concatCss).from(one.transforms.injectProd, { primary: false });
one.unlink(one.transforms.minifyJs).from(one.outputs.writeToProd);
one.unlink(one.transforms.concatJs).from(one.transforms.injectProd, { primary: false });
one.link(one.transforms.minifyCss).to(ngOne.revCssJs);
one.link(one.transforms.minifyJs).to(ngOne.revCssJs);
one.link(ngOne.revCssJs).to(one.transforms.injectProd, { primary: false });
one.link(ngOne.revCssJs).to(one.outputs.writeToProd);


// Custom tasks

// Protractor
function getProtractorBinary(binaryName) {
    var npm_global_root = execSync('npm config get prefix').toString().trim();

    var pathToProtractor;
    if (/^win/.test(process.platform)) {
        pathToProtractor = path.join(npm_global_root, '/' + binaryName + '.cmd');
    } else {
        pathToProtractor = path.join(npm_global_root, 'bin', '/' + binaryName);
    }
    return pathToProtractor;
}

gulp.task('protractor-install', function (done) {
    spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit',
    }).once('close', done);
});

gulp.task('protractor', function (done) {
    spawn(getProtractorBinary('protractor'), process.argv.slice(3), {
        stdio: 'inherit',
    }).once('close', done);
});

// Docs
gulp.task('docs', function () {
    return gulp.src(['src/**/*.js', '!src/docs', '!src/docs/**'], { read: false })
        .pipe(jsdoc({
            opts: {
                destination: 'src/docs',
            },
        }));
});

// Test
gulp.task('test', function (done) {
    var files = [];

    one.sources.bowerJs()
        .pipe(through2.obj(function (chunk, enc, callback) {
            this.push(chunk.path);

            callback();
        }))
        .on('data', function (data) {
            files.push(data);
        })
        .on('end', function () {
            files.push(
                './bower_components/angular-mocks/angular-mocks.js',
                './.one-gulp/dev/build.js',
                './.one-gulp/dev/app/core/constants.js',
                './src/test/specs/**/*.js',
                './src/**/*.html'
            );

            new KarmaServer({
                configFile: __dirname + '/karma.conf.js',
                files: files,
                singleRun: !argv.dev,
            }, done).start();
        });
});

// Lint
gulp.task('lint', function (done) {
    exec('npm run lint', function (err, stdout) {
        /* eslint-disable no-console */
        console.log(stdout);
        /* eslint-enable no-console */

        done(err);
    });
});
