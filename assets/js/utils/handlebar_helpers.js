var moment = require('moment');

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch(operator) {
        case '==':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('checkIndexOf', function(arr, v1, options) {
    if(arr) {
        if(arr.length) {
            if(arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('counter', function(start, limit, block) {
    var accum = '';
    var i;

    for(i = start; i <= limit; ++i) {
        accum = accum + block.fn(i);
    }

    return accum;
});
Handlebars.registerHelper('counterReverse', function(start, end, block) {
    var accum = '';
    var i;

    for(i = start; i >= end; --i) {
        accum = accum + block.fn(i);
    }

    return accum;
});

Handlebars.registerHelper('countFullStar', function(rating) {
    rating       = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 ? Math.floor(rating) : Math.ceil(rating);
});

Handlebars.registerHelper('countHalfStar', function(rating) {
    rating       = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 1 : 0;
});

Handlebars.registerHelper('countEmptyStar', function(rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 4 - Math.floor(rating) : 5 - Math.ceil(rating);
});

Handlebars.registerHelper('truncateText', function(text, max) {
    if(text) {
        max = Number(max);
        if(text.length > max)
            return text.substring(0, max) + '...';
        else
            return text;
    } else
        return '';

});

Handlebars.registerHelper('removeSpaceAndLink', function(text) {
    text = text.split(' ');
    text = text.join('_').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('removeSpaceAndLinkByHyphen', function(text) {
    text = text.split(' ');
    text = text.join('-').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('checkIndexOf', function(arr, v1, options) {
    if(arr) {
        if(arr.length) {
            if(arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('formatDate', function(dateString, format) {
    if(dateString && format) {
        return moment(dateString).format(format)
    } else {
        return ''
    }
});

Handlebars.registerHelper('cleanString', function(text) {
    if(text) {
        text = text.toString();
        text = text.split(' ');
        text = text.join('_').toLocaleLowerCase();
    }
    return text;
});

Handlebars.registerHelper('cleanStringForUrl', function(_str) {
    if(_str) {
        _str = _str.replace(/\s/g, '-');
    }
    return (_str);
});

Handlebars.registerHelper('countDateTime', function(dateString) {
    if(dateString) {
        return moment(dateString, 'YYYYMMDD').fromNow();
    } else {
        return ''
    }
});
