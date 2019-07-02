var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var async         = require('async');

function NotificationHandler() {

    function bindCommonClickEvents() {
        $('.js_select2').select2({});

        $('.js_input_profile_file').change(function() {
            readURL(this);
        });

        $('.js_panel_title.unread').click(function() {
            var _this   = $(this);
            var _notification_id =$(this).data('notification_id');

            var _obj = {
                status:"read"
            };
            ApiUtil.makeAjaxRequest('/api/admin-notifications/' + _notification_id, '', 'PUT', '', _obj, function(_res) {
                if(!_res.error && _res.data) {
                    //window.location.href = '/notifications';
                    //alert('message read');
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        });

        $('.js_panel_title').click(function() {
            var _this            = $(this);
            var _parent          = $(this).closest('.js_main_card_sec');
            var _swiperContainer = _parent.find('.swiper-container');
            var _swiperData      = _swiperContainer.data('swiper');

            if(!_this.hasClass('collapsed')) {
                _parent.find('.js_panel_title').addClass('read');

            } else {
                _parent.find('.js_more_btn_link').removeClass('hide');
                _parent.find('.js_open_card').addClass('hide');
                _parent.find('.js_reopen_card').addClass('hide');
                _parent.find('.js_total_application_txt').addClass('application');
            }
        });

    }

    return {
        init:function() {
            bindCommonClickEvents();
        }
    }
}

module.exports = NotificationHandler();