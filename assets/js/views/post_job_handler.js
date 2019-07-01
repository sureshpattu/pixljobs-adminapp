var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var waterfall     = require('async-waterfall');

function PostJobHandler() {

    function bindCommonClickEvents() {
        $('.js_select2').select2({});
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

        function updateInputs(data) {
            from = data.from;
            to   = data.to;

            $inputFrom.prop('value', from);
            $inputTo.prop('value', to);
        }

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

        $('.js_job_requirements').select2({
            tags           :true,
            tokenSeparators:[',']
        });
    }

    function bindPostJobEvent() {
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var locationType1 = _form.find('#locationType1');
                var locationType2 = _form.find('#locationType2');

                var _location_type = '';
                if(locationType1.attr('checked')) {
                    _location_type = locationType1.val();
                }
                if(locationType2.attr('checked')) {
                    _location_type = locationType2.val();
                }

                var _obj = {
                    name         :_form.find('.js_title').val(),
                    recruiter_id :_form.find('.js_recruiter_id').val(),
                    job_type     :_form.find('.js_job_type').val(),
                    salary_min   :_form.find('.js-input-from').val(),
                    salary_max   :_form.find('.js-input-to').val(),
                    location_type:_location_type
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {
                        postJobCategory(_res.data.id, _form);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobCategory(_job_id, _form) {
        var _obj = {
            qa_job_id  :_job_id,
            category_id:_form.find('.js_category').val()
        };
        ApiUtil.makeAjaxRequest('/api/qa-job/categories', '', 'POST', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                postJobRequirements(_job_id, _form);
                // window.location.href = '/post-job/info/' + _job_id;
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postJobRequirements(_job_id, _form) {
        var _obj = {
            qa_job_id   :_job_id,
            requirements:_form.find('.js_job_requirements').val() || []
        };
        ApiUtil.makeAjaxRequest('/api/requirements', '', 'POST', '', _obj, function(_res) {

            if(!_res.error) {
                window.location.href = '/post-job/info/' + _job_id;
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindPostJobWorkInfoEvent() {
        var _form_name = '#jsJobInfoForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _job_id = _form.find('.js_job_id').val();

                var _obj = {
                    work_week:_form.find('.js_work_week').val(),
                    holidays :_form.find('.js_holidays').val(),
                    desc     :_form.find('.js_desc').val()
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {

                        postJobTechnologies(_job_id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobTechnologies(_job_id, _form) {
        var _technologies = _form.find('.js_technologies').val();
        if(_technologies) {
            waterfall(_technologies.map(function(arrayItem) {
                return function(lastItemResult, CB) {
                    if(!CB) {
                        CB             = lastItemResult;
                        lastItemResult = null;
                    }
                    var _obj = {
                        qa_job_id    :_job_id,
                        technology_id:arrayItem
                    };

                    ApiUtil.makeAjaxRequest('/api/qa-job/technologies', '', 'POST', '', _obj, function(_res) {
                        CB(null, []);
                    });
                }
            }), function(err, result) {
                window.location.href = '/post-job/company/' + _job_id;
            });
        }
    }

    function bindPostJobCompanyEvent() {
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });

        $('.jsSubmitExistingCompanyBtn').click(function() {
            _company_check_box.each(function(index, ele) {
                console.log(index, ele);
                var _this = $(ele);
                if(_this.prop('checked')) {
                    var _company_id = _this.data('cid');
                    updateJobCompany(_company_id);
                    return false;
                }
            });
        });

        $('.jsSubmitCompanyBtn').click(function() {
            $('#jsJobCompanyForm').submit();
        });

        var _company_check_box = $('.js_company_check_box');
        if(_company_check_box) {
            _company_check_box.click(function() {
                var _this = $(this);
                if(_this.prop('checked')) {
                    _company_check_box.prop('checked', false);
                    _this.prop('checked', true);
                } else {
                    _company_check_box.prop('checked', false);
                    _this.prop('checked', false);
                }
            });

            $('.js_add_new_company_btn').click(function() {
                _company_check_box.prop('checked', false);
                $('.js_forms_wrap').removeClass('hide');
                $(this).addClass('hide');

                $('.jsSubmitCompanyBtn').removeClass('hide');
                $('.jsSubmitExistingCompanyBtn').addClass('hide');
                $('.js_select2').select2({});
            });
        }

    }

    function updateJobCompany(_company_id) {
        var _job_id = $('.js_job_id').val();

        var _obj = {
            company_id:_company_id
        };
        ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                alert('Job posted successfully!');
                window.location.href = '/';
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindPostJobCompanyFormEvent() {
        var _form_name = '#jsJobCompanyForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            //console.log('hi');
            if(FormValidator.validateForm(_form_name)) {
                var _company_obj = {
                    recruiter_id:$('.js_user_id').val(),
                    name        :_form.find('.js_company_name').val() || '0',
                    industry_id :_form.find('.js_industry').val(),
                    size        :_form.find('.js_company_size').val(),
                    url         :_form.find('.js_company_url').val(),
                    about       :_form.find('.js_about_company').val(),
                    street      :_form.find('.js_street').val(),
                    area        :_form.find('.js_area').val(),
                    city        :_form.find('.js_city').val(),
                    state       :_form.find('.js_state').val(),
                    pin         :_form.find('.js_pin').val(),
                    country     :_form.find('.js_country').val(),
                    email       :_form.find('.js_candidate_email').val()
                };

                ApiUtil.makeAjaxRequest('/api/companies', '', 'POST', '', _company_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        uploadFiles(_res.data.id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function uploadFiles(company_id, _form) {
        var _input_file = _form.find('.js_input_c_logo_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/companies/photo/upload/' + company_id, '', 'POST', '',
                formData,
                function(_res_path) {
                    postCompanyBenefits(company_id, _form);
                });
        } else {
            postCompanyBenefits(company_id, _form);
        }
    }

    function postCompanyBenefits(company_id, _form) {
        var _company_obj = {
            company_id:company_id,
            benefits  :_form.find('.js_company_benefit').val() || []
        };

        ApiUtil.makeAjaxRequest('/api/benefits', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error) {
                updateJobCompany(company_id);
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    return {
        init        :function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        },
        initWorkInfo:function() {
            bindPostJobWorkInfoEvent();
            $('.js_technologies').select2({
                tags           :true,
                tokenSeparators:[',']
            });
        },
        initCompany :function() {
            bindPostJobCompanyEvent();
            bindPostJobCompanyFormEvent();
        }
    }
}

module.exports = PostJobHandler();