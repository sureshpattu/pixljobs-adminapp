var ApiUtil           = require('../utils/apiUtil');
var FormValidator     = require('../utils/formValidator');
var utils             = require('../utils/common');
var HandlebarsHelpers = require('../utils/handlebar_helpers');

function JobSearchHandler() {
    var _job_list_wrap = $('.js_job_list_wrap'),
        _query         = {
            page :0,
            limit:10
        },
        _jobTypeArr    = [],
        _setTimeout    = null,
        _isPageLoad    = false;

    function searchJobs() {
        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        }
        _query.page  = 0;
        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;
                var _html   = Handlebars.partials['job_search_card']({
                    data:resData.data.result
                });
                _job_list_wrap.html(_html);

                if(_length >= 10) {
                    $('.js_load_more_btn').removeClass('hide');
                } else {
                    $('.js_load_more_btn').addClass('hide');
                }

            }
        };
        ApiUtil.makeAjaxRequest('/api/jobs/search', '', 'POST', '', _query, callback);
    }

    function loadMoreJobs() {
        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        }
        _query.page = _query.page + 1;

        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;

                if(_length) {
                    var _html = Handlebars.partials['job_search_card']({
                        data:resData.data.result
                    });
                    _job_list_wrap.append(_html);
                }

                if(resData.data.pages > _query.page) {
                    $('.js_load_more_btn').removeClass('hide');
                } else {
                    $('.js_load_more_btn').addClass('hide');
                }

            }
        };
        ApiUtil.makeAjaxRequest('/api/jobs/search', '', 'POST', '', _query, callback);
    }

    function bindClickEvents() {
        $('.js_select2').select2({});

        $('.js_search_input').on('keyup', function(e) {
            var _val = $(this).val();
            if(_val) {
                _query.query = _val;
                searchJobs();
            } else {
                delete _query.query;
                searchJobs();
            }
        });

        $('.js_job_type_checkbox').click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _jobTypeArr.push(_this.data('val'))
            } else {
                var index = _jobTypeArr.indexOf(_this.data('val'));
                if(index > -1) {
                    _jobTypeArr.splice(index, 1);
                }
            }
            searchJobs();
        });

        $('.js_category').on('change', function() {
            var _val = $(this).val();
            if(_val) {
                _query.category_id = _val;
            } else {
                delete _query.category_id;
            }
            searchJobs();
        });

        $('.js_load_more_btn').click(function() {
            loadMoreJobs();
        });
    }

    function salaryMinMaxTimeOut(from, to) {
        if(_setTimeout) {
            clearTimeout(_setTimeout);
        }
        _setTimeout = setTimeout(function() {
            _query.salary_min = from;
            _query.salary_max = to;
            searchJobs();
        }, 1500);
    }

    function updateInputs(data) {
        var from = data.from;
        var to   = data.to;

        $('.js-input-from').prop('value', from);
        $('.js-input-to').prop('value', to);

        if(_isPageLoad) {
            salaryMinMaxTimeOut(from, to);
        }
        _isPageLoad = true;
    }

    function bindRangeSlider() {
        var $range     = $('.js-range-slider'),
            $inputFrom = $('.js-input-from'),
            $inputTo   = $('.js-input-to'),
            instance,
            min        = 0,
            max        = 3000000,
            from       = 0,
            to         = 0;

        $range.ionRangeSlider({
            type              :'double',
            min               :min,
            max               :max,
            from              :0,
            to                :500000,
            prefix            :'Rp. ',
            onStart           :updateInputs,
            onChange          :updateInputs,
            step              :50000,
            prettify_enabled  :true,
            prettify_separator:'.',
            values_separator  :' - ',
            force_edges       :true

        });

        instance = $range.data('ionRangeSlider');

        $inputFrom.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < min) {
                val = min;
            } else if(val > to) {
                val = to;
            }

            instance.update({
                from:val
            });
        });

        $inputTo.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < from) {
                val = from;
            } else if(val > max) {
                val = max;
            }

            instance.update({
                to:val
            });
        });
    }

    return {
        init:function() {
            bindRangeSlider();
            bindClickEvents();
        }
    }
}

module.exports = JobSearchHandler();