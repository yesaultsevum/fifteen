/*globals
jQuery, alert, console
*/

(function ($) {

    'use strict';

    var arrayKnuckle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        arrIsCoplete = arrayKnuckle.concat(0), //порядок собранных костяшек
        arrRandom = arrayKnuckle.sort(function () { //перемешиваем порядок костяшек
            return Math.random() - 0.5;
        }).concat(0),
        moves_counter = 0,
        timerStop,
        time,
        music = true,
        arrRecords = [];

    function solvablePuzzle(order) { //проверка порядка костяшек на решаемость
        var i, j, counter = 0;
        for (i = 0; i < order.length - 1; i += 1) {
            for (j = i + 1; j < order.length - 1; j += 1) {
                if (order[i] > order[j]) {
                    counter += 1;
                }
            }
        }
        return (counter % 2 !== 0);
    }

    function swap(order, item1, item2) { //обмен местами костяшек
        var t = order[item2];
        order[item2] = order[item1];
        order[item1] = t;
    }

    if (solvablePuzzle(arrRandom)) {
        swap(arrRandom, 0, 1);
    }

    function createKnuckles(order) { //отрисовка костяшек
        var i, length = order.length;
        for (i = 0; i < length; i += 1) {
            $('.box').append('<div id = "' + (i + 1) + '" class = "knuckle on">' + order[i] + '</div>');
            $('#16').addClass('zero');
        }
    }

    function sound() {
        var audio = new Audio();
        audio.src = "audio/click.wav";
        audio.autoplay = 'true';
    }

    function timer() {
        var minutes = 0, mm, seconds = 0, ss;

        var timerGo = setInterval(function () {
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

        timerStop = function () {
            clearInterval(timerGo);
        };

    }

    function movesCounter() {
        moves_counter += 1;
        $('.moves_inner_counter').text(moves_counter);
    }

    function entryRecord() {
        var name_to_records = $('#enter_name_input').val(),
            time_to_records = time,
            moves_to_records = moves_counter,
            current_user_data = {
                name: name_to_records,
                time: time_to_records,
                moves: moves_to_records
            },
            i,
            position_in_ranking = arrRecords.length;

        arrRecords[position_in_ranking] = current_user_data;
        arrRecords.sort(function (a, b) {
            if (a.time.split(':')[0] !== b.time.split(':')[0]) {
                return a.time.split(':')[0] > b.time.split(':')[0];
            } else {
                return a.time.split(':')[1] > b.time.split(':')[1];
            }
        }).splice(4);

        $('.current_user_record').remove();

        for (i = 0; i < arrRecords.length; i += 1) {
            $('.table-records').append("<tr class='current_user_record'><td class='td_number'>" + (i + 1) + "</td><td class='td_name'>" + arrRecords[i].name + "</td><td class='td_time'>" + arrRecords[i].time + "</td><td class='td_moves'>" + arrRecords[i].moves + "</td></tr>");
        }
    }

    $('.puzzle_cover').on('click', function () {
        $('.puzzle_cover').hide();
        createKnuckles(arrRandom);
        timer();
    });

    $('.switch_sound').on('click', function () {
        if (music) {
            $('.switch_sound_img').css('background', '#C32626');
            music = false;
        } else {
            $('.switch_sound_img').css('background', '#68AB4D');
            music = true;
        }
    });

    $(document).on('click', '.on', function () { //движения костяшек при клике
        var value = $(this).text(),
            id = +$(this).attr('id'),
            matches = 0,
            i,
            item,
            that = $(this),
            toRight = $('#' + (id + 1) + ''),
            toLeft = $('#' + (id - 1) + ''),
            toUp = $('#' + (id - 4) + ''),
            toDown = $('#' + (id + 4) + '');

        function moveKnuckle(direction) {
            that.addClass('zero').text(0);
            direction.removeClass('zero').text(value);
            movesCounter();
            if (music) {
                sound();
            }
        }

        if (toRight.hasClass('zero') && (id !== 12 && id !== 8 && id !== 4)) {
            moveKnuckle(toRight);
        }
        if (toLeft.hasClass('zero') && (id !== 13 && id !== 9 && id !== 5)) {
            moveKnuckle(toLeft);
        }
        if (toUp.hasClass('zero')) {
            moveKnuckle(toUp);
        }
        if (toDown.hasClass('zero')) {
            moveKnuckle(toDown);
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
            timerStop();
            $('.knuckle').removeClass('on');
            $('.new_game').slideDown(500);
            entryRecord();
        }
    });

    $('.new_game').on('click', function () {
        $('.box').empty();
        moves_counter = 0;
        $('.moves_inner_counter').text(moves_counter);
        createKnuckles(arrRandom);
        $('.knuckle').addClass('on');
        timer();
        $(this).slideUp(500);
    });

}(jQuery));