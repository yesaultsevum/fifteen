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
            $('.box').append('<div id = "' + (i + 1) + '" class = "knuckle">' + arrRandom[i] + '</div>');
            $('#16').addClass('zero');
        }
    }
    createKnuckles();

    $(document).on('click', '.knuckle', function () {
        var value, id, arrForCheck = [], i, item;
        value = $(this).text();
        id = +$(this).attr('id');
        if ($('#' + (id + 1) + '').hasClass('zero') && (id !== 12 && id !== 8 && id !== 4)) {
            $(this).addClass('zero').text(0);
            $('#' + (id + 1) + '').removeClass('zero').text(value);
        }
        if ($('#' + (id - 1) + '').hasClass('zero') && (id !== 13 && id !== 9 && id !== 5)) {
            $(this).addClass('zero').text(0);
            $('#' + (id - 1) + '').removeClass('zero').text(value);
        }
        if ($('#' + (id - 4) + '').hasClass('zero')) {
            $(this).addClass('zero').text(0);
            $('#' + (id - 4) + '').removeClass('zero').text(value);
        }
        if ($('#' + (id + 4) + '').hasClass('zero')) {
            $(this).addClass('zero').text(0);
            $('#' + (id + 4) + '').removeClass('zero').text(value);
        }
        // Проверка на собранность
        for (i = 1; i <= 16; i += 1) {
            item = +$('#' + i + '').text();
            arrForCheck.push(item);
        }
        if (arrIsCoplete === arrForCheck) {
            alert('OK');
        }
    });

}(jQuery));