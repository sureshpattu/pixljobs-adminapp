function PopupPage() {

    function bindClickEvents(_allow_close) {
        //open popup
        $('.cd-popup-trigger').off('click').on('click', function (event) {
            event.preventDefault();
            $('body').addClass('popup-visible');
            $('.cd-popup').addClass('is-visible');
        });

        if (!_allow_close) {
            //close popup
            $('.cd-popup').off('click').on('click', function (event) {
                if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup-close-icon') ||
                    ($(event.target).is('.cd-popup') && !$(".email_sign_up_pop_up").is(":visible"))) {
                    event.preventDefault();
                    $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
                    $(this).removeClass('is-visible');
                    $("#windowPopup").remove();
                }
            });
            //close popup when clicking the esc keyboard button
            $(document).keyup(function (event) {
                if (event.which === '27' && !$(".email_sign_up_pop_up").is(":visible")) {
                    $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
                    $('.cd-popup').removeClass('is-visible');
                    $("#windowPopup").remove();
                }
            });
        }
    }

    return {
        init: function (html, cb, _allow_close, theme) {
            $("#windowPopup").remove();
            var tmpl = Handlebars.partials['popup'];
            $('body').append(tmpl({
                html: html,
                dont_allow_close: _allow_close,
                theme: theme
            })).css('overflow-y', 'hidden');
            bindClickEvents(_allow_close);
            if (cb) {
                cb();
            }
        },
        close: function () {
            $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
            $('.cd-popup').removeClass('is-visible');
            $("#windowPopup").remove();
        }
    }
}

module.exports = PopupPage();
