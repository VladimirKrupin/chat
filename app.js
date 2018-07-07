var express = require('express');
var http = require('http');
var config = require('./config');
var log = require('libs/log');
var app = express();

http.createServer(app).listen(config.get('port'), function () {

    log.info('\x1b[36m%s\x1b[0m', 'Success!');
    log.info('Express server listening on port \x1b[35m%s\x1b[0m' , config.get('port'));
    log.info('Request http://localhost:3000 in your browser');
    log.error('error');

});

//Middleware
app.use(function (req, res, next) {
    if (req.url === '/') {
        res.end('Home');
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.url === '/error') {
        next(new Error("wops, error!"));
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    res.send(404, '404');
});

app.use(function (err, req, res, next) {
    // res.send(403, app.get('env'));
});

// var favicon = require('static-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var routes = require('./routes/index');
// var users = require('./routes/users');
//
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(favicon());
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
//
// /// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// /// error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
//
//
// module.exports = app;
