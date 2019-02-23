// gulp的操作: 创建任务，任务中处理文件和代码，执行任务 task,src,dest,pipe,watch
const gulp = require('gulp')
const pathUtil = require('path')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const htmlmin = require('gulp-htmlmin') // 压缩html
const autoprefixer = require('gulp-autoprefixer') // 处理css前缀
const rev = require('gulp-rev') // 加版本号
const revCollector = require('gulp-rev-collector'); // 更改html中文件资源
const gulpSequence = require('gulp-sequence') // 控制任务执行顺序
// 解构出来的配置文件
const { 
    webpackConfig 
} = require('./config')

// 更改webpack打包模式，直接压缩
webpackConfig.mode = 'production'
// 处理js兼容 编译ES6 -> ES5
webpackConfig.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-transform-runtime'
            ]
        }
    }
})

// 迁移static资源
gulp.task('copy-static', () => {
    return gulp.src('src/static/**/*')
                .pipe(gulp.dest('build/static'))
})

// 迁移html资源
gulp.task('copy-html', () => {
    return gulp.src(['rev/**/*.json', 'src/*.html'])
                .pipe(revCollector())
                .pipe(htmlmin({
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    removeComments: true
                }))
                .pipe(gulp.dest('build'))
})

// 编译sass
gulp.task('compile-sass', () => {
    return gulp.src('src/stylesheets/**/*.scss')
                .pipe(sass({
                    outputStyle: 'compressed'
                }))
                .pipe(autoprefixer({
                    browsers: ['last 4 versions'],
                    cascade: false
                }))
                .pipe(rev())
                .pipe(gulp.dest('build/stylesheets'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('rev/stylesheets'))
})

// 打包js
gulp.task('pack-js', () => {
    return gulp.src('src/javascripts/**/*')
                .pipe(webpack(webpackConfig))
                .pipe(rev())
                .pipe(gulp.dest('build/javascripts'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('rev/javascripts'))
})





gulp.task('default',gulpSequence(['copy-static',  'compile-sass','pack-js'], 'copy-html'))