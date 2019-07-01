var ApiUtil           = require('../utils/apiUtil');
var FormValidator     = require('../utils/formValidator');
var utils             = require('../utils/common');
var HandlebarsHelpers = require('../utils/handlebar_helpers');

function JobInfoHandler() {

    function postJobApplication() {
        var _applicant_id = $('.js_applicant_id').val();
        var _job_id       = $('.js_job_id').val();
        if(_applicant_id && _job_id) {
            var _obj     = {
                applicant_id:_applicant_id,
                job_id      :_job_id
            };
            var callback = function(resData) {
                if(!resData.error) {
                    $('.js_apply_cta_wrap').addClass('hide');
                } else {
                    alert(resData.message || 'something went wrong!');
                }
            };
            ApiUtil.makeAjaxRequest('/api/job-applications', '', 'POST', '', _obj, callback);
        }
    }

    function bindClickEvents() {
        $('.js_apply_job').click(function() {
            postJobApplication();
        });

    }

    return {
        init:function() {
            bindClickEvents();
        }
    }
}

module.exports = JobInfoHandler();