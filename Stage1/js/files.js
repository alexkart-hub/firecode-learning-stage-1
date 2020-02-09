$(function() {
    $("#datepicker").datepicker({
        showAnim: "drop"
            // showAnim: "fold"
            // showAnim: "slideDown"
            // showAnim: "bounce"
            // showAnim: "clip"
            // showAnim: "slide"
    });
});
$(document).ready(function() {
    $('select').niceSelect();
});
$(function() {
    $("#telephone").mask("+7(999) 999-99-99");
});
$(".input_calc").on({
    "keydown": function(e) {
        e.key == 0 ||
            e.key == 1 ||
            e.key == 2 ||
            e.key == 3 ||
            e.key == 4 ||
            e.key == 5 ||
            e.key == 6 ||
            e.key == 7 ||
            e.key == 8 ||
            e.key == 9 ||
            e.key == "Tab" ||
            e.key == "Backspace" ||
            e.key == "Delete" ||
            e.key == "ArrowLeft" ||
            e.key == "ArrowRight" ||
            e.key == "Escape" ||
            e.key == "Enter" ||
            e.preventDefault();
        console.log(e.key);
    }
});

$('#group1 input:checkbox').click(function() {
    if ($(this).is(':checked')) {
        $('#group1 input:checkbox').not(this).prop('checked', false);
    }
});

$('#group2 input:checkbox').click(function() {
    if ($(this).is(':checked')) {
        $('#group2 input:checkbox').not(this).prop('checked', false);
    }
});

$("#submit").on({
    "click": function(e) {
        let check_box = $('#personal_data');
        let phone = $('#telephone');
        if (check_box.is(':checked') && phone.val() != '') {
            $.ajax({
                url: 'php/script.php',
                cache: false,
                success: function(text) {
                    $('.popup-fade').fadeIn();
                    return text;
                }
            });
        } else {
            let msg = '';
            if (!check_box.is(':checked')) {

                msg = 'Необходимо согласиться на обработку персональных данных!';
                hint(msg, check_box);
            }
            if (phone.val() == '') {

                if (!check_box.is(':checked')) {
                    msg = 'Необходимо ввести телефон и согласиться на обработку персональных данных!';
                } else {
                    msg = 'Необходимо ввести телефон!';
                }
                hint(msg, phone);
            }

        }
    },
});

var img = $('<div class="hint"><p></p></div>');

let start = {
    'top': 0,
    'left': 0,
    'width': 50,
    'height': 10,
    'opacity': 0
};
img.css({
        'top': start.top,
        'left': start.left,
        'width': start.width,
        'height': start.height,
        'opacity': start.opacity
    })
    .prependTo('body');

img.on({
    'click': function(e) {
        hintOut($(this));
    }
});

$('#personal_data, #telephone').on({
    'click': function() {
        hintOut();
    }
});

function hint(massage, obj) {
    document.querySelector('.hint>p').innerHTML = massage;


    if (img.css('width') == '50px') {
        img.animate({
                'opacity': .9,
                'top': obj.offset().top + 40,
                'left': (window.innerWidth - 300) / 2,
            }, {
                duration: 300,
                queue: false,
                specialEasing: {
                    height: 'swing',
                    width: 'swing'
                }
            })
            .animate({
                'width': 300,
                'height': 100
            }, {
                duration: 300,
                queue: true,
                specialEasing: {
                    height: 'swing',
                    width: 'swing'
                },
                complele: function(e) {
                    obj.on({
                        'click': function() {
                            hintOut();
                        }
                    });
                }
            });
    } else {
        img
            .animate({
                'top': start.top,
                'width': start.width,
                'opacity': start.opacity
            }, {
                duration: 1000,
                queue: false,
                specialEasing: {
                    // height: 'linear',
                    height: 'swing',
                    // width: 'linear'
                    width: 'swing'
                }
            })
            .animate({
                'left': start.left,
                'height': start.height
            }, {
                duration: 700,
                queue: true,
                specialEasing: {
                    // height: 'linear',
                    height: 'swing',
                    // width: 'linear'
                    width: 'swing'
                },
                complete: function() {
                    document.querySelector('.hint>p').innerHTML = '';
                }
            });
    }
}

function hintOut() {
    img
        .animate({
            'top': start.top,
            'width': start.width,
            'opacity': start.opacity
        }, {
            duration: 1000,
            queue: false,
            specialEasing: {
                height: 'swing',
                width: 'swing'
            }
        })
        .animate({
            'left': start.left,
            'height': start.height
        }, {
            duration: 700,
            queue: true,
            specialEasing: {
                height: 'swing',
                width: 'swing'
            },
            complite: function() {
                document.querySelector('.hint>p').innerHTML = '';
            }
        });
}

// Закрыть модальное окно крестом
$('.popup-close').click(function() {
    $(this).parents('.popup-fade').fadeOut();
    return false;
});

// Закрытие по клавише Esc.
$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        e.stopPropagation();
        $('.popup-fade').fadeOut();
    }
});

// Клик по фону, но не по окну.
$('.popup-fade').click(function(e) {
    if ($(e.target).closest('.popup').length == 0) {
        $(this).fadeOut();
    }
});