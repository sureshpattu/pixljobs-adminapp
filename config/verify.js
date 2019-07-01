'use strict';

const helper_utils = require('../routes/util/common');
const config       = require('./config');

exports.clearUserCookie = function(req, res, next) {
    res.clearCookie('pixljob_user_id');
    res.clearCookie('pixljob_user_token');
    next();
};

function clearCookie(req, res) {
    if(req.session && req.session.user) {
        req.session.user = [];
    }
    res.clearCookie('pixljob_user_token');
    res.clearCookie('pixljob_user_id');
}

function checkApplicantLogin(req, cb) {
    if(req.cookies && req.cookies.pixljob_user_id && req.cookies.pixljob_user_token) {
        //Make api call to backend and check is user is valid
        req.body = {
            id   :req.cookies.pixljob_user_id,
            token:req.cookies.pixljob_user_token
        };
        helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/login/check', function(_response) {
            cb(_response);
        });
    } else {
        cb({error:true, msg:'User Not Logged in'});
    }
}

function checkRecruiterLogin(req, cb) {
    if(req.cookies && req.cookies.pixljob_user_id && req.cookies.pixljob_user_token) {
        //Make api call to backend and check is user is valid
        req.body = {
            id   :req.cookies.pixljob_user_id,
            token:req.cookies.pixljob_user_token
        };
        helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/login/check', function(_response) {
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

exports.getUserIdFromSession = function(req, res, next) {
    if(req.session.hasOwnProperty('user')) {
        return req.session.user.id;
    } else {
        res.redirect('/login?ref=' + req.originalUrl);
    }
};

exports.isApplicantLoggedIn = function(req, res, next) {
    if(checkPath(req)) {
        next();
    } else {
        checkApplicantLogin(req, function(data) {
            if(data && !data.error) {
                next();
            } else {
                showLoginPage(req, res);
            }
        });
    }
};

exports.isRecruiterLoggedIn = function(req, res, next) {
    if(checkPath(req)) {
        //Allow user to go to next page
        next();
    } else {
        checkRecruiterLogin(req, function(data) {
            if(data && !data.error) {
                next();
            } else {
                showLoginPage(req, res)
            }
        });
    }
};

