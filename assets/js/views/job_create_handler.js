var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function JobCreateHandler() {
    function bindJobForm1Event() {
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/applicant-auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });
    }

    function bindRecruiterLoginEvent() {
        var _form_name = '#jsRecruiterLoginForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/recruiter-auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

    }

    function bindForgotPasswordFormEvent() {
        if (FormValidator.validateForm('#forgotPasswordForm')) {
            var obj = {
                email: $('.js_email').val(),
            };
            var callback = function (data) {
                if (data && !data.err) {
                    alert(data.msg);
                } else {

                    alert(data.msg || 'something went wrong');
                }
                console.log(data);
            };
            ApiUtil.makeAjaxRequest('/api/forgot-password', '', 'POST', '', obj, callback);
        }
    }

    return {
        initForm1              :function() {
            bindJobForm1Event();
        },
        initForm2:function() {
            bindRecruiterLoginEvent();
        },
        initForm3:function() {
            bindForgotPasswordFormEvent();
        }
    };
}

module.exports = JobCreateHandler();