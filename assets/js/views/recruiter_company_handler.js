var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterCompanyHandler() {
    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader          = new FileReader();
            var _img_pre_holder = $('.js_img_pre_holder');

            reader.onload = function(e) {
                _img_pre_holder.attr('src', e.target.result);
                _img_pre_holder.removeClass('hide');
                $('.js_profile_img_txt').addClass('hide');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function bindRecruiterEvent() {

    }

    function uploadFiles(_form, recruiter_id) {
        var _input_file = _form.find('.js_input_profile_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/recruiter/photo/upload/' + recruiter_id, '', 'POST', '',
                formData,
                function(_res_path) {
                    if(!_res_path.error) {
                        alert(_res.message);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                    postCompanyDetails(recruiter_id, _form);
                });
        } else {
            postCompanyDetails(recruiter_id, _form);
        }
    }

    function postCompanyDetails(user_id, _form) {
        var _company_obj = {
            recruiter_id:user_id,
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
            country     :_form.find('.js_country').val()
        };

        ApiUtil.makeAjaxRequest('/api/companies', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error && _res.data) {
                postCompanyBenefits(_res.data.id, _form)
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postCompanyBenefits(company_id, _form) {
        var _company_obj = {
            company_id:company_id,
            benefits  :_form.find('.js_company_benefit').val() || []
        };

        ApiUtil.makeAjaxRequest('/api/benefits', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/recruiter'
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindCommonClickEvents() {
        $('.js_input_profile_file').change(function() {
            readURL(this);
        });
        var _company_check_box = $('.js_company_checkbox');
        _company_check_box.click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _company_check_box.prop('checked', false);
                _this.prop('checked', true);
            } else {
                _company_check_box.prop('checked', false);
                _this.prop('checked', false);
            }
            var _obj = {
                default_company_id:_this.data('id')
            };

            ApiUtil.makeAjaxRequest('/api/recruiter/' + _this.data('recruiter-id'), '', 'PUT', '', _obj,
                function(_res) {
                    if(!_res.error) {
                        alert('Default company updated successfully.');
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
        });

    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindRecruiterEvent();
            $('.js_company_benefit').select2({
                tags           :true,
                tokenSeparators:[',']
            });
        }
    }
}

module.exports = RecruiterCompanyHandler();