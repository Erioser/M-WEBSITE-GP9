// gulp的操作: 创建任务，任务中处理文件和代码，执行任务 task,src,dest,pipe,watch
const gulp = require('gulp')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')
const pathUtil = require('path')
const sass = require('gulp-sass')
const del = require('del')
const webpack = require('webpack-stream')
// 解构出来的配置文件
const { 
    serverConfig,
    webpackConfig 
} = require('./config')

// 迁移static资源
gulp.task('copy-static', () => {
    return gulp.src('src/static/**/*')
                .pipe(gulp.dest('dist/static'))
})

// 迁移html资源
gulp.task('copy-html', () => {
    return gulp.src('src/*.html')
                .pipe(gulp.dest('dist'))
})

// 编译sass
gulp.task('compile-sass', () => {
    return gulp.src('src/stylesheets/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('dist/stylesheets'))
})

// 打包js
gulp.task('pack-js', () => {
    return gulp.src('src/javascripts/**/*')
                .pipe(webpack(webpackConfig))
                .pipe(gulp.dest('dist/javascripts'))
})

// server
gulp.task('server', () => {
    return gulp.src('dist')
            .pipe(webserver(serverConfig))
})


// watch
gulp.task('watch', () => {
    gulp.watch('src/*.html', ['copy-html'])
    gulp.watch('src/stylesheets/**/*.scss', ['compile-sass'])
    gulp.watch('src/javascripts/**/*', ['pack-js'])


    // 监听静态资源变化
    watch('src/static/**/*', (v) => {
        if ( v.events === 'unlink' ) { // 如果是删除动作就删除对应的dist中的文件
            let _path = pathUtil.resolve('dist/static/', v.path.split('\\static\\')[1])
            del(_path)
        } else {
            // 如果是新增和更改，就将静态资源直接再次输出到打包路径
            gulp.start(['copy-static'])
        }
    })
})

gulp.task('default',
    [
        'copy-static',
        'copy-html',
        'compile-sass',
        'pack-js',
        'watch',
        'server'
    ],
    () => { console.log('running!') }
)