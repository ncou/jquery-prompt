// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    $.prompt = function(text) {
        return new Promise(function(resolve,reject){

            var prompt = $('<div>', {class: 'prompt'}),
                cancel = $('<button>', {class: 'cancel'}).html('Cancel'),
                ok = $('<button>', {class: 'ok'}).html('OK');

            cancel.click(close).click(reject);
            ok.click(close).click(resolve);

            $('body').append(prompt.append($('<div>').append($('<div>').html(text), cancel, ok)));

            function close(){
                prompt.remove();
            }
        });
    };
}));
