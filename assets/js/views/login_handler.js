var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function LoginHandler() {
    function bindApplicantLoginEvent() {
        var _form_name = '#jsApplicantLoginForm';
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
                        window.location.href = '/applicant-account';
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
                        window.location.href = '/recruiter';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

    }

    function bindForgotPasswordFormEvent() {
        var isApplicant = true;
        var _form_name  = '#forgotPasswordForm';
        var _form       = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email:_form.find('.js_email').val()
                };

                var _api_url = '/api/applicant-auth/forgot/password';
                if(!isApplicant) {
                    _api_url = '/api/recruiter-auth/forgot/password';
                }
                ApiUtil.makeAjaxRequest(_api_url, '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        alert(_res.message);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

        var _applicant_tab = $('.js_applicant_tab');
        var _recruiter_tab = $('.js_recruiter_tab');

        _applicant_tab.on('click', function() {
            _applicant_tab.addClass('active');
            _recruiter_tab.removeClass('active');
            isApplicant = true;

        });

        _recruiter_tab.on('click', function() {
            _applicant_tab.removeClass('active');
            _recruiter_tab.addClass('active');
            isApplicant = false;
        });
    }


    function bindResetPasswordFormEvent() {
        var _form_name  = '#resetPasswordForm';
        var _form       = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if (FormValidator.validateForm(_form_name)) {
                var _new_pass = _form.find('.js_new_passwd').val();
                var _confirm_pass = _form.find('.js_confirm_passwd').val();
                var user_id = _form.find('.js_user_id').val();
                var _obj = {};

                if (_new_pass === _confirm_pass) {
                    _obj = {
                        password: _new_pass,
                    };
                    postResetPassword(_obj, _form);
                } else {
                    _form.find('.js_server_error').removeClass('hide');
                    _form.find('.js_server_error_msg').html('Confirm password not matched!');
                    _form.find('.js_confirm_passwd').addClass('error');
                }
            }
            return false;
        });

    }

    function postResetPassword(obj, formEle) {
        var callback = function (data) {
            if (data && data._id) {
                window.location.href = '/logout';
            } else {
                formEle.find('.js_server_error').removeClass('hide');
                formEle.find('.js_server_error_msg').html(data.msg);
            }
        };
        ApiUtil.makeAjaxRequest('/api/applicant/reset-password/' + obj.user_id, '', 'POST', '', obj, callback);
    }

    function bindCommonClickEvents() {
        var _recruiterLoginForm = $('#jsRecruiterLoginForm');
        var _applicantLoginForm = $('#jsApplicantLoginForm');

        var _applicant_tab = $('.js_applicant_tab');
        var _recruiter_tab = $('.js_recruiter_tab');

        _applicant_tab.on('click', function() {
            _applicantLoginForm.removeClass('hide');
            _recruiterLoginForm.addClass('hide');

            _applicant_tab.addClass('active');
            _recruiter_tab.removeClass('active');

        });

        _recruiter_tab.on('click', function() {
            _applicantLoginForm.addClass('hide');
            _recruiterLoginForm.removeClass('hide');

            _applicant_tab.removeClass('active');
            _recruiter_tab.addClass('active');
        });
    }

    return {
        init              :function() {
            bindCommonClickEvents();
            bindApplicantLoginEvent();
            bindRecruiterLoginEvent();
        },
        initForgotPassword:function() {
            bindForgotPasswordFormEvent();
        },
        initResetPassword:function() {
            bindResetPasswordFormEvent();
        },
    };
}

module.exports = LoginHandler();