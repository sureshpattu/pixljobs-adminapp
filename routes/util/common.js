'use strict';

const _          = require('underscore');
const request    = require('request');
const config     = require('../../config/config');
const _api       = config.apiEndPoint;
const fs         = require('fs');
const formidable = require('formidable');

function checkApiResponse(response) {
    return response && response.body ? _.isObject(response.body) ? response.body : JSON.parse(response.body) : null;
}

exports.postApiRequest = function(req, res, url) {
    let options = {
        uri    :_api + url,
        method :'POST',
        json   :req.body,
        headers:config.apiAccessToken
    };
    request.post(options, function(err, response) {
        let _response = checkApiResponse(response);
        res.json(_response);
    });
};

exports.makeApiRequest = function(req, type, url, cb, res) {
    let options                = {
        uri    :_api + url,
        method :(type === 'IMAGE') ? 'GET' : type,
        json   :req.body,
        headers:config.apiAccessToken
    };
    options.headers.apiHost    = req.headers.host;
    options.headers.user_id    = req.cookies.med_cond_user_id || null;
    options.headers.user_token = req.cookies.med_cond_user_token || null;

    if(type === 'POST') {
        request.post(options, function(err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if(type === 'GET') {
        request.get(options, function(err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if(type === 'PUT') {
        request.put(options, function(err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if(type === 'DELETE') {
        request.delete(options, function(err, response) {
            let _response = checkApiResponse(response);
            cb(_response);
        });
    }

    if(type === 'IMAGE') {
        request.get(options).pipe(res);
    }

    if(type === 'IMAGE-UPLOAD') {
        let form       = new formidable.IncomingForm();
        form.multiples = false;
        form.on('file', function(field, file) {
            if(file && file.path) {
                fs.readFile(file.path, function(err, data) {
                    if(err) {
                        cb({error:true, message:'file not found.'});
                    } else {
                        let formData                = {
                            photo:{
                                value  :fs.createReadStream(file.path),
                                options:{
                                    filename   :file.name,
                                    contentType:file.type
                                }
                            }
                        };
                        options.method              = 'POST';
                        options.headers.contentType = 'multipart/form-data';
                        options.formData            = formData;
                        delete options.json;
                        request.post(options, function(err, _response) {
                            let response = checkApiResponse(_response);
                            cb(response);
                        });
                    }
                });
            } else {
                cb({error:true, message:'file not found.'});
            }
        });
        form.on('error', function(err) {
            console.log('An error has occurred: \n', err);
            cb({error:true, message:'file not found.'});
        });
        form.parse(req);
    }
};

exports.validateResponse = function(response) {
    checkApiResponse(response);
};
