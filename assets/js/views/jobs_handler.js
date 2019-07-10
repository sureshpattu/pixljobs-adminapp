var ApiUtil          = require('../utils/apiUtil');
var FormValidator    = require('../utils/formValidator');
var async            = require('async');
var HandlebarHelpers = require('../utils/handlebar_helpers');

function JobsHandler() {
    var job_list_wrap = $('.job_list_wrap');
    var _query        = {
            page :0,
            limit:10
        },
        _jobTypeArr   = [];

    function updateAdminDetailsInQaJob(_obj, _ele, callback) {
        var _card_row     = _ele.closest('.js_main_card_sec');
        var _qa_job_id    = _card_row.data('job-id');
        var _recruiter_id = _card_row.data('recruiter-id');
        var _admin_id     = $('.js_user_id').val();

        var _adminObj = {
            admin_id  :_admin_id,
            admin_msg :_obj.msg,
            admin_date:new Date(),
            status    :_ele.data('type')
        };
        ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _card_row.data('job-id'), '', 'PUT', '', _adminObj,
            function(_res) {
                callback();
            });
    }

    function postNotification(_obj, _ele) {
        var _card_row     = _ele.closest('.js_main_card_sec');
        var _qa_job_id    = _card_row.data('job-id');
        var _recruiter_id = _card_row.data('recruiter-id');
        var _admin_id     = $('.js_user_id').val();
        _obj.recruiter_id = _recruiter_id;
        _obj.admin_id     = _admin_id;
        _obj.qa_job_id    = _qa_job_id;

        async.parallel([
            function(callback) {
                ApiUtil.makeAjaxRequest('/api/notifications', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        callback(null, _res);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            },
            function(callback) {
                var _jobVersionObj = {
                    qa_job_id:_qa_job_id,
                    admin_id :_admin_id
                };
                ApiUtil.makeAjaxRequest('/api/qa-job/version', '', 'POST', '',
                    _jobVersionObj,
                    function(_res) {
                        callback(null, _res);
                    });
            }
        ], function(err, results) {
            _card_row.remove();
        });
    }

    function bindRejectFormEvent(_ele) {
        var _form_name = '.jsReasonForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _parent = $(_ele.closest('.js_main_card_sec'));
                var _title  = _parent.find('.js_qa_job_title').val();
                var _obj    = {
                    subject:_title + ' - REJECTED',
                    msg    :_form.find('.js_reason').val()
                };
                PopupPage.close();

                updateAdminDetailsInQaJob(_obj, _ele, function() {
                    postNotification(_obj, _ele);
                });
            }
            return false;
        });
    }

    function publishJob(_ele) {
        var _parent    = $(_ele.closest('.js_main_card_sec'));
        var _title     = _parent.find('.js_qa_job_title').val();
        var _qa_job_id = _parent.find('.js_qa_job_id').val();
        var _obj       = {
            subject:_title + ' - PUBLISHED',
            msg    :'Your job has been published'
        };

        updateAdminDetailsInQaJob(_obj, _ele, function() {
            ApiUtil.makeAjaxRequest('/api/admin/publish/job/' + _qa_job_id, '', 'POST', '', _obj, function(_res) {
                if(!_res.error) {
                    postNotification(_obj, _ele);
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        });

    }

    function bindUnPublishFormEvent(_ele) {
        var _form_name = '.jsReasonForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _parent    = $(_ele.closest('.js_main_card_sec'));
                var _title     = _parent.find('.js_qa_job_title').val();
                var _qa_job_id = _parent.find('.js_qa_job_id').val();
                var _obj       = {
                    subject:_title + ' - UNPUBLISHED',
                    msg    :_form.find('.js_reason').val()
                };
                PopupPage.close();
                updateAdminDetailsInQaJob(_obj, _ele, function() {
                    ApiUtil.makeAjaxRequest('/api/admin/un-publish/job/' + _qa_job_id, '', 'POST', '', _obj,
                        function(_res) {
                            if(!_res.error) {
                                postNotification(_obj, _ele);
                            } else {
                                alert(_res.message || 'Something went wrong!');
                            }
                        });
                });

            }
            return false;
        });
    }

    function loadMoreJobs() {
        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        }
        _query.page = _query.page + 1;
        _query.status = $('.js_status').val();

        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;

                if(_length) {
                    var _html = Handlebars.partials['job_card_row']({
                        data:resData.data.result
                    });
                    job_list_wrap.append(_html);
                }

                if(resData.data.pages >= (_query.page + 1)) {
                    $('.js_load_more_job').addClass('hide');
                } else {
                    $('.js_load_more_job').removeClass('hide');
                }

            }
        };

        ApiUtil.makeAjaxRequest('/api/admin/qa-jobs/search', '', 'POST', '', _query, callback);
    }

    function bindClickEvents() {

        $('.js_load_more_job').click(function() {
            loadMoreJobs();
        });

        $('.js_publish_job').click(function() {
            publishJob($(this));
        });

        $('.js_unpublish_job').click(function() {
            var _this       = $(this);
            var _popup_html = Handlebars.partials['reason_form']();
            PopupPage.init(_popup_html, function() {
                bindUnPublishFormEvent(_this);
            }, false, 'reason_form_popup');
        });

        $('.js_reject_job').click(function() {
            var _this       = $(this);
            var _popup_html = Handlebars.partials['reason_form']();
            PopupPage.init(_popup_html, function() {
                bindRejectFormEvent(_this);
            }, false, 'reason_form_popup');
        });
    }

    return {
        init:function() {
            bindClickEvents();
        }
    };
}

module.exports = JobsHandler();