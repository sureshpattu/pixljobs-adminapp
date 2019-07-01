(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.PopupPage                   = require('./utils/popupHandler');
window.LoginHandler                = require('./views/login_handler');
},{"./utils/popupHandler":4,"./views/login_handler":5}],2:[function(require,module,exports){
var qs = require('querystring');

module.exports = {
    makeAjaxRequest:function(url, query, method, dataType, data, callback) {
        if(!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        var reqObj = {
            url     :url,
            method  :method,
            dataType:dataType,
            data    :data,
            success :function(res) {
                if(res.responseText) {
                    callback(JSON.parse(res.responseText));
                } else {
                    callback(res)
                }
            },
            error   :function(err) {
                if(err.responseText) {
                    callback(JSON.parse(err.responseText));
                } else {
                    callback(err)
                }
            }
        };

        //Make ajax request with given details
        $.ajax(reqObj);
    },

    makeFileUploadRequest:function(url, query, method, dataType, data, callback) {
        if(!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        //Make ajax request with given details
        $.ajax({
            url        :url,
            method     :'POST',
            data       :data,
            contentType:false,
            processData:false,
            success    :function(res) {
                if(res.responseText) {
                    callback(JSON.parse(res.responseText));
                } else {
                    callback(res)
                }
            },
            error      :function(err) {
                if(err.responseText) {
                    callback(JSON.parse(err.responseText));
                } else {
                    callback(err)
                }
            }
        });
    }
};
},{"querystring":8}],3:[function(require,module,exports){
module.exports = {
    validateForm: function (formId) {
        var _this = this;
        var status = true;

        function markError(element, errorMsgId) {
            var className = '.' + errorMsgId;
            $(formId).find(className).show();
            element.addClass('error-field');
            status = false;
            return false;
        }

        function unMarkError(element, errorMsgId) {
            var className = '.' + errorMsgId;
            $(formId).find(className).hide();
            element.removeClass('error-field');
        }

        function validateFieldType(fieldType, element, elementVal, errorMsgId) {
            if (typeof _this[fieldType] === 'function') {
                return _this[fieldType](elementVal, element) ? unMarkError(element, errorMsgId) : markError(element, errorMsgId);
            }
            return false;
        }

        $(formId + ' .required').each(function () {
            var element = $(this);
            var elementVal = $(this).val();
            var errorMsgId = element.attr('data-errormsg');
            var validateList = element.attr('data-groupname');
            var isElementsNeedValidation = false;

            if (elementVal === '' && !validateList) {
                markError(element, errorMsgId);
                return;
            }

            $.each(_this.getAllFieldsToValidate(), function (index, value) {
                if (element.hasClass(value)) {
                    isElementsNeedValidation = true;
                    validateFieldType(value, element, elementVal, errorMsgId);
                }
            });

            if (!isElementsNeedValidation) {
                unMarkError(element, errorMsgId);
            }
        });
        return status;
    },

    getAllFieldsToValidate: function () {
        return ['isValidEmail', 'isValidMobileNumber', 'isNumber', 'isLengthOk', 'numberInRange', 'isValidResetPassword', 'isEqualTo', 'isCardNo', 'validateList'];
    },

    isNumber: function (input) {
        return !isNaN(input);
    },

    numberInRange: function (input, element) {
        var inputInt = Number(input);
        var min = $(element).data('min');
        var max = $(element).data('max');
        if (!this.isNumber(input)) {
            return false;
        }
        return inputInt >= min && inputInt <= max;
    },

    isLengthOk: function (input, element) {
        var minLength = element.data('minlength');
        var maxLength = element.prop('maxlength');
        return input.length >= minLength && input.length <= maxLength;
    },

    isValidEmail: function (email) {
        var emailRegex = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    },

    isValidUserName: function (userName) {
        userName = userName.trim();
        return userName.length >= 4;
    },

    isValidAmount: function (amount) {
        var amountRegex = /^[1-9]\d+$/;
        return amountRegex.test(amount);
    },

    isValidMobileNumber: function (mobileNumber) {
        var mobileNumberTrimmed = mobileNumber.trim();
        var minlength = 10;
        var specialCharRegex = /^[\w{./\\(),'}:?®©-]+$/;
        var isValidNumber = mobileNumberTrimmed > 0;
        var hasSpecialChars = specialCharRegex.test(mobileNumberTrimmed);
        var isSatisfyLenth = mobileNumberTrimmed.length >= minlength;
        return (isValidNumber && hasSpecialChars && isSatisfyLenth);
    },

    isEqualTo: function (password, element) {
        var equalField = element.data('equalto');
        return $(equalField).val() === password;
    },

    isCardNo: function (input, element) {
        var inputEdited = input.replace(/ /g, '');
        var minLength = element.data('minlength');
        var maxLength = element.prop('maxlength');
        return inputEdited.length >= minLength && inputEdited.length <= maxLength;
    },

    validateList: function (input, element) {
        var groupName = element.data('groupname');
        var status = false;
        $('[name="' + groupName + '"]').each(function () {
            if ($(this).is(':checked')) {
                status = true;
                return;
            }
        });
        return status;
    }
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function LoginHandler() {
    function bindLoginFormEvent() {
        var _form_name = '#jsLoginForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/admin-auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });
    }

    return {
        init:function() {
            bindLoginFormEvent();
        }
    };
}

module.exports = LoginHandler();
},{"../utils/apiUtil":2,"../utils/formValidator":3}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],8:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":6,"./encode":7}]},{},[1]);
