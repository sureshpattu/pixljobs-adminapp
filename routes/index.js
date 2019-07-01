const express      = require('express');
const router       = express.Router();
const verify       = require('../config/verify');
const async        = require('async');
const helper_utils = require('./util/common');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logout', function(req, res) {
    res.clearCookie('pixljob_ad_user_id');
    res.clearCookie('pixljob_ad_user_token');
    res.redirect('/login');
});

router.get('/', function(req, res) {
    res.render('form_template');
});

module.exports = router;
