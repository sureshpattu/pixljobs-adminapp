var ApiUtil   = require('../utils/apiUtil');
var waterfall = require('async-waterfall');
var utils     = require('../utils/common');

function ImgUploadHandler() {
    var video = document.querySelector('#camera-stream');

    function takeSnapshot() {
        var hidden_canvas = document.querySelector('canvas'),
            context       = hidden_canvas.getContext('2d');

        var width  = video.videoWidth,
            height = video.videoHeight;

        if(width && height) {
            hidden_canvas.width  = width;
            hidden_canvas.height = height;
            context.scale(-1, 1);
            context.drawImage(video, 0, 0, width * -1, height);
            context.restore();
            return hidden_canvas.toDataURL('image/png');
        }
    }

    function train(snap, uid, _cb) {
        var data = JSON.stringify({image:snap, name:uid});
        $.ajax({
            url        :'/api/submit/photos',
            type       :'post',
            dataType   :'json',
            contentType:'application/json',
            success    :function(data) {
                _cb();
            },
            data       :data
        });
    }

    function bindClickEvents() {
        $('.js_take_photo').on('click', function(e) {
            e.preventDefault();
            var snap = takeSnapshot();
            $('canvas').hide();
            $(this).find('.js_preview_img').attr('src', snap).removeClass('hide');
            var _index = $(this).index();
            $(this).removeClass('active');
        });
        $('.js_submit_img').on('click', function() {
            var _imgs = [];
            var _uid  = $('.js_data_id').val();
            $('.js_take_photo').each(function() {
                if($(this).find('.js_preview_img').attr('src')) {
                    _imgs.push($(this).find('.js_preview_img').attr('src'));
                }
            });
            utils.showLoader('Uploading your photos...');
            waterfall(_imgs.map(function(_obj) {
                return function(lastItemResult, CB) {
                    if(!CB) {
                        CB             = lastItemResult;
                        lastItemResult = null;
                    }
                    train(_obj, _uid, function() {
                        CB(null, []);
                    })
                };
            }), function(_results) {
                window.location.href = 'http://demo.medinin.com/patients'
            });
        });
        var _card_sec = $('.js_card_sec');
        _card_sec.click(function() {
            _card_sec.removeClass('active');
            $(this).addClass('active');
        });
    }

    return {
        init:function f() {
            navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            if(!navigator.getMedia) {
                //displayErrorMessage('Your browser doesn\'t have support for the navigator.getUserMedia interface.');
            } else {
                // Request the camera.
                navigator.getMedia({video:true},
                    function(stream) {
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                    },
                    // Error Callback
                    function(err) {
                        //displayErrorMessage('There was an error with accessing the camera stream: ' + err.name, err);
                    }
                );
            }
            bindClickEvents();
        }
    }

}

module.exports = ImgUploadHandler();
