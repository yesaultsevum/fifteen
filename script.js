/*globals
jQuery, alert, console
*/

(function ($) {

    'use strict';

    var arrayKnuckle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        arrIsCoplete = arrayKnuckle.concat(0), //порядок собранных костяшек
        arrRandom = arrayKnuckle.sort(function () { //перемешиваем порядок костяшек
            return Math.random() - 0.5;
        }).concat(0);

    function solvablePuzzle(order) { //проверка порядка костяшек на решаемость
        var i, j, counter = 0;
        for (i = 0; i < order.length - 1; i += 1) {
            for (j = i + 1; j < order.length - 1; j += 1) {
                if (order[i] > order[j]) {
                    counter += 1;
                }
            }
        }
        return !(counter % 2 === 0);
    }

    function swap(item1, item2) { //обмен местами костяшек
        var t = item2;
        item2 = item1;
        item1 = t;
    }

    if (solvablePuzzle(arrRandom)) {
        swap(arrRandom[0], arrRandom[1]);
    }

    function createKnuckles(order) { //отрисовка костяшек
        var i, length = order.length;
        for (i = 0; i < length; i += 1) {
            $('.box').append('<div id = "' + (i + 1) + '" class = "knuckle">' + order[i] + '</div>');
            $('#16').addClass('zero');
        }
    }

    function sound() {
        var audio = new Audio();
        audio.src = "audio/click.wav";
        audio.autoplay = 'true';
    }

    function timer() {
        var minutes = 0,
        mm,
        seconds = 0,
        ss,
        time;

        setInterval(function () {
            seconds += 1;
            if (seconds < 10) {
                ss = '0' + seconds;
            } else if (seconds < 60) {
                ss = seconds;
            } else {
                seconds = 0;
                ss = '0' + seconds;
                minutes += 1;
            }

            if (minutes < 10) {
                mm = '0' + minutes;
            } else if (minutes < 60) {
                mm = minutes;
            } else {
                alert('время истекло');
                minutes = 0;
                seconds = 0;
                mm = '0' + minutes;
            }

            time = mm + ':' + ss;
            $('.inner_time').text(time);

        }, 1000);

    }

    $('.puzzle_cover').on('click', function () {
    	$('.puzzle_cover').hide();
    	createKnuckles(arrRandom);
    	timer();
    });

    $(document).on('click', '.knuckle', function () { //движения костяшек при клике
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