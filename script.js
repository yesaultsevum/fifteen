/*globals
jQuery, alert, console
*/

(function ($) {

    'use strict';

    var arrIsCoplete = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
        arrRandom;

    arrRandom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {
        return Math.random() - 0.5;
    }).concat(0);

    console.log(arrRandom);

    function createKnuckles() {
        var i, length = arrRandom.length;
        for (i = 0; i < length; i += 1) {
            $('.box').append('<div id = "' + i + '" class = "knuckle">' + arrRandom[i] + '</div>');
        }
    }
    createKnuckles();

}(jQuery));