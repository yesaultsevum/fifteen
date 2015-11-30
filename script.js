/*globals
jQuery, alert, console
*/

(function ($) {

    'use strict';

    var arrayKnuckle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        arrIsCoplete = arrayKnuckle.concat(0),
        arrRandom = arrayKnuckle.sort(function () {
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

    function sound() {
        var audio = new Audio();
        audio.src = "audio/click.wav";
        audio.autoplay = 'true';
    }

    $(document).on('click', '.knuckle', function () {
        var value, id, matches = 0, i, item;
        value = $(this).text();
        id = +$(this).attr('id');
        if ($('#' + (id + 1) + '').hasClass('zero') && (id !== 12 && id !== 8 && id !== 4)) {
            $(this).addClass('zero').text(0);
            $('#' + (id + 1) + '').removeClass('zero').text(value);
            sound();
        }
        if ($('#' + (id - 1) + '').hasClass('zero') && (id !== 13 && id !== 9 && id !== 5)) {
            $(this).addClass('zero').text(0);
            $('#' + (id - 1) + '').removeClass('zero').text(value);
            sound();
        }
        if ($('#' + (id - 4) + '').hasClass('zero')) {
            $(this).addClass('zero').text(0);
            $('#' + (id - 4) + '').removeClass('zero').text(value);
            sound();
        }
        if ($('#' + (id + 4) + '').hasClass('zero')) {
            $(this).addClass('zero').text(0);
            $('#' + (id + 4) + '').removeClass('zero').text(value);
            sound();
        }
        // Проверка на собранность
        for (i = 1; i <= 16; i += 1) {
            item = +$('#' + i + '').text();
            if (item === arrIsCoplete[i - 1]) {
                matches += 1;
            } else {
                break;
            }
        }
        if (matches === 16) {
            alert('COMPLETE!');
            $(document).off('click', '.knuckle');
        }
    });

}(jQuery));