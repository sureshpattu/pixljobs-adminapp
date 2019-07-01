'use strict';

const helper_utils = require('../routes/util/common');
const config       = require('./config');

exports.clearUserCookie = function(req, res, next) {
    res.clearCookie('pj_ad_user_id');
    res.clearCookie('pj_ad_user_token');
    next();
};

function clearCookie(req, res) {
    if(req.session && req.session.user) {
        req.session.user = [];
    }
    res.clearCookie('pj_ad_user_token');
    res.clearCookie('pj_ad_user_id');
}

function checkUserLogin(req, cb) {
    if(req.cookies && req.cookies.pj_ad_user_id && req.cookies.pj_ad_user_token) {
        //Make api call to backend and check is user is valid
        req.body = {
            id   :req.cookies.pj_ad_user_id,
            token:req.cookies.pj_ad_user_token
        };
        helper_utils.makeApiRequest(req, 'POST', '/admin-auth/login/check', function(_response) {
            cb(_response);
        });
    } else {
        cb({error:true, msg:'User Not Logged in'});
    }
}

function checkPath(req) {
    let userActivateUrlRegx = new RegExp('^\/user\/activate\/[0-9,a-z,A-Z^)]*');
    return req.path === '/login' ||
        req.path === '/api/login' ||
        req.path === '/login/mobile' ||
        req.path === '/login/email' ||
        req.path === '/login/pass-code' ||
        userActivateUrlRegx.test(req.path) ||
        req.path === '/logout' ||
        req.path === '/checkLogin';
}

function showLoginPage(req, res) {
    //Clear User cookie
    clearCookie(req, res);
    //Redirect To Login Page
    res.redirect('/login?ref=' + req.originalUrl);
}

exports.isUserLoggedIn = function(req, res, next) {
    if(checkPath(req)) {
        next();
    } else {
        checkUserLogin(req, function(data) {
            if(data && !data.error) {
                next();
            } else {
                showLoginPage(req, res);
            }
        });
    }
};

