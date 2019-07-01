var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function ApplicantApplicationHandler() {

    function bindCommonClickEvents() {

    }

    return {
        init:function() {
            bindCommonClickEvents();
        }
    }
}

module.exports = ApplicantApplicationHandler();