exports.clearForm = function(formId) {
    $(formId).find('input').val(' ');
    $(formId).find('select').val(' ');
    $(formId).find('textarea').val(' ');
    $(formId).find('input[type="checkbox"]').removeAttr('checked');
    $(formId).find('input[type="radio"]').removeAttr('checked');
};

exports.getParameterByName = function(name, url) {
    if(!url) url = window.location.href;
    name        = name.replace(/[\[\]]/g, '\\$&');
    var regex   = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

exports.showVideo = function(video_id, page_name, class_name) {
    var _popup_html = Handlebars.partials[page_name]();
    PopupPage.init(_popup_html, '', false, '');
    $('.cd-popup-container').addClass(class_name);
};

exports.showLoader = function(text, options, _html) {
    var Html = Handlebars.partials['page_loader']({html:_html, text:text});
    $('body').append(Html).addClass('popup-visible');
};

exports.hideLoader = function() {
    $('#windowLoaderPopup').remove();
    $('body').removeClass('popup-visible');
};


exports.initProfileImageCropper = function(formId, _previewEle, imageId, _cb) {
    var image                = document.getElementById(imageId);
    var cropBoxData;
    var canvasData;
    var cropper;
    var inputElement         = $(formId).find('.js_file_input');
    var submitElement        = $(formId).find('.js_submit_img');
    var closeBtnElement      = $(formId).find('.js_img_popup_close');
    var previewEle           = $(_previewEle).find('.js_upload_icon_cont');
    var previewBackEle       = $(_previewEle).find('.js_img_pre_holder');
    var _input_profile_photo = $(_previewEle).find('.js_input_profile_photo');

    function readURL(input, preview_ele) {
        if(input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function(e) {
                $(preview_ele).attr('src', e.target.result);
                if(cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(image, {
                    autoCropArea:0.5,
                    aspectRatio :1 / 1,
                    ready       :function() {
                        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                    }
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    inputElement.change(function() {
        if(this.files[0].size < 5580960) {
            readURL(this, $(this).data('preview'));
        } else {
            alert('file must be select less than 5 MB')
        }
    });

    submitElement.off('click').on('click', function() {
        previewEle.addClass('hide');
        closeBtnElement.trigger('click');
        previewBackEle.attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
        previewBackEle.removeClass('hide');

        if(_cb) {
            _cb();
        }
    })
};
