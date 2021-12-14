const gulp      = require( 'gulp' );
const webserver = require( 'gulp-webserver' );

gulp.task(
    'webserver',
    function() {
        gulp.src( './' )
            .pipe(
                webserver(
                    {
                        fallback: 'index.html',
                        livereload: true,
                        port: 8080,
                        directoryListing: {
                            enable: true,
                            path: './'
                        },
                        open: true,
                    }
                )
            );
    }
);