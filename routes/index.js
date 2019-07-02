const express      = require('express');
const router       = express.Router();
const verify       = require('../config/verify');
const async        = require('async');
const helper_utils = require('./util/common');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logout', function(req, res) {
    res.clearCookie('pj_ad_user_id');
    res.clearCookie('pj_ad_user_token');
    res.redirect('/login');
});

router.get('/', verify.isUserLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/admin/' + req.cookies.pj_ad_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'POST', '/admin/qa-jobs/search',
                function(_res) {
                    callback(null, _res);
                });
        }
    ], function(err, results) {
        res.render('dashboard', {
            user:!results[0].error ? results[0].data : [],
            data:!results[1].error ? results[1].data : []
        });
    });
});

router.get('/notifications', verify.isUserLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/admin/' + req.cookies.pj_ad_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'POST', '/admin/qa-jobs/search',
                function(_res) {
                    callback(null, _res);
                });
        }
    ], function(err, results) {
        res.render('notifications', {
            user:!results[0].error ? results[0].data : [],
            data:!results[1].error ? results[1].data : []
        });
    });
});

module.exports = router;
