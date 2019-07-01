'use strict';

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const exphbs       = require('express-handlebars');
const compression  = require('compression');
const index        = require('./routes/index');
const api          = require('./routes/api');
const app          = express();

app.use(compression());

// view engine setup
app.engine('.hbs', exphbs({
    extname    :'.hbs',
    layoutsDir :'views',
    helpers    :require('./server/handlebar_helpers'),
    partialsDir:path.join(__dirname, 'views/partials')
}));

app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.png')));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err    = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
