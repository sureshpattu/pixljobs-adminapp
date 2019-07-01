var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterHandler() {
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
        $('.js_select2').select2({});
        var _form_name = '#jsSignUpRecruitForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _user_obj = {
                    name       :_form.find('.js_name').val(),
                    email      :_form.find('.js_email').val(),
                    password   :_form.find('.js_password').val(),
                    mobile     :_form.find('.js_mobile').val(),
                    gender     :_form.find('.js_gender').val(),
                    designation:_form.find('.js_designation').val()
                };

                ApiUtil.makeAjaxRequest('/api/recruiter-auth/register', '', 'POST', '', _user_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        uploadFiles(_form, _res.data.id);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
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
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindRecruiterEvent();
        }
    }
}

module.exports = RecruiterHandler();