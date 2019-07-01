'use strict';

const express      = require('express');
const router       = express.Router();
const helper_utils = require('./util/common');

function setUserCookies(_response, res) {
    if(_response && !_response.error && _response.data) {
        res.clearCookie('pixljob_ad_user_id');
        res.clearCookie('pixljob_ad_user_token');
        res.cookie('pixljob_user_id', _response.data.id, {maxAge:30 * 24 * 60 * 60 * 1000});
        res.cookie('pixljob_user_token', _response.data.token, {maxAge:30 * 24 * 60 * 60 * 1000});
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
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/login', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/admin-auth/forgot/password', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/forgot/password', function(_response) {
        res.json(_response);
    });
});

router.post('/admin-auth/forgot/password/token', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/forgot/password/token', function(_response) {
        res.json(_response);
    });
});

module.exports = router;
