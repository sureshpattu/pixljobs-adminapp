'use strict';

const express      = require('express');
const router       = express.Router();
const helper_utils = require('./util/common');

function setUserCookies(_response, res) {
    if(_response && !_response.error && _response.data) {
        res.clearCookie('pj_ad_user_id');
        res.clearCookie('pj_ad_user_token');
        res.cookie('pj_ad_user_id', _response.data.id, {maxAge:30 * 24 * 60 * 60 * 1000});
        res.cookie('pj_ad_user_token', _response.data.token, {maxAge:30 * 24 * 60 * 60 * 1000});
        res.json(_response);
    } else {
        res.json(_response);
    }
}

//applicants APIs
router.post('/admin-auth/register', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin-auth/register', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/admin-auth/login', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin-auth/login', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/admin-auth/forgot/password', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin-auth/forgot/password', function(_response) {
        res.json(_response);
    });
});

router.post('/admin-auth/forgot/password/token', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin-auth/forgot/password/token', function(_response) {
        res.json(_response);
    });
});

router.post('/admin-notifications/fetch-all', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin-notifications/fetch-all', function(_response) {
        res.json(_response);
    });
});

router.post('/notifications', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/notifications', function(_response) {
        res.json(_response);
    });
});

router.post('/admin/publish/job/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin/publish/job/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.post('/admin/un-publish/job/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/admin/un-publish/job/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.put('/qa-jobs/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/qa-jobs/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.post('/qa-job/version', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/qa-job/version', function(_response) {
        res.json(_response);
    });
});

router.get('/admin-notifications', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'GET', '/admin-notifications', function(_response) {
        res.json(_response);
    });
});


router.put('/admin-notifications/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/admin-notifications/' +req.params.id, function(_response) {
        res.json(_response);
    });
});

module.exports = router;
