var kazanMap, myplacemark1, myplacemark2, myplacemark3;
$(document).ready(function() {
    //слайдер товаров на главно
    $('.filtering').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.logo-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.adress-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
        fade: true,
        dots: true

    });
    if ($("body").width() > 1400) {
        $(".main-slider .slick-prev").css("left", $(".container").eq(0).offset().left - 80);
        $(".main-slider .slick-next").css("right", $(".container").eq(0).offset().left - 80);

    }


    //фильтрация в слайдере товаров на главной
    $('.slider-nav__link').on('click', function(e){
        var val = $(this).attr("data-filter");
        $(this).closest(".filter-slider").find('.filtering').slick('slickUnfilter');
        $(this).closest(".filter-slider").find('.filtering').slick('slickFilter','[data-filter=' + val +']');
        $(this).closest(".filter-slider").find('.slider-nav__link').removeClass("active");
        $(this).addClass("active");

    });

    //подчеркивание вкладок при ховере
    $(".slider-nav__inner").append("<div class='border border--blue'></div>");
    $(".slider-nav__link").hover(function(e) {
            tabBorder($(this));
        },
        function(e) {
            if ($(".slider-nav__link.active").length) {
                tabBorder($(".slider-nav__link.active"));
            }
        });

    //карта на главной
    if ($("#address-map").length && $("body").width() > 991) {

        // Strict mode

// Init
        ymaps.ready(mainmap);



        function mainmap(){
            kazanMap = new ymaps.Map("address-map", {
                center: [55.784576, 49.116667],
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl'],
            });


            myplacemark1 = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.790848, 49.121775]
                },
                properties: {
                    balloonContentHeader: 'myplacemark1',
                    balloonContentBody: 'Текст балуна'
                }

            });
            myplacemark2 = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.792134, 49.122126]
                }});
            myplacemark3 = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.785154, 49.118667]
                }});

            kazanMap.geoObjects.add(myplacemark1);
            kazanMap.geoObjects.add(myplacemark2);
            kazanMap.geoObjects.add(myplacemark3);
            //kazanMap.container.fitToViewport();
            // Additions
            //kazanMap.behaviors.disable('scrollZoom'); // Dissable scrollzoom
            //kazanMap.behaviors.disable('drag'); // Dissable drag (for mobiles)

        }

    }
    setHeight($(".adress"));
    $(".adress").on("click", function(e) {
        $(this).closest("section").css("height", "");
        $(this).closest("section").height($(this).closest("section").height() + 300);
         kazanMap.container.fitToViewport();
        //var point = new ymaps.GeoPoint(37.609218,55.753559); // Координаты центра Москвы

       /* kazanMap.setZoom(14).panTo([55.785154, 49.118667], {
            flying: 1
        });*/
       var cor = $(this).attr("data-coord") ? eval($(this).attr("data-coord")) : [55.792134, 49.122126];
       cor[0] = cor[0] + 0.0045;
        kazanMap.panTo(
            // Координаты нового центра карты
            cor, {
                /* Опции перемещения:
                 разрешить уменьшать и затем увеличивать зум
                 карты при перемещении между точками
                 */
                flying: true
            }
        )


    });
    $(".gamburger").on("click", function(e) {
        $(this).toggleClass("open");
        $($(this).attr("data-toggle")).slideToggle();
    });
    //ползунок цены в фильтре
    if($(".range").length) {
        $(".range").slider({
            tooltip: 'hide'
        });
        var inpitChange = function() {
            $('.filter-min').val(inputMin.getValue()[0]);
            $('.filter-max').val(inputMin.getValue()[1]);
        };

        var inputMin = $('.range').slider()
            .on('slide', inpitChange)
            .data('slider');
        var inputMax = $('.range').slider()
            .on('slide', inpitChange)
            .data('slider');
        $('.filter-max, .filter-min').on("change", function (e) {
            $('.range').slider('setValue', [+$('.filter-min').val(), +$('.filter-max').val()]);
        });
    }
//стилизация выпадающего списка
    $('.styler').styler();

    $(".catalog-list__icon").on("click", function (e) {
        $(this).toggleClass("active");
        return false;
    });


    $("body").css("opacity", 1).addClass("body-ready");


});



//добавляет подчеркивание в топменю
function tabBorder(e) {
    var b = e.width(),
        c = (e.outerWidth(true) - b) / 2,
        d = e.position().left;
    $(".border").css("left", d + c).css("width", b)
}

//превращает кнопку в лоадер
function addLoaderInBtn(e) {
    $(e).css("color", "transparent").html($(e).html() + "<div class='loader'>" +
        "<span></span>" +
        "<span></span>" +
        "<span></span>" +
        "</div>");
}
function removeLoaderInBtn(e) {
    $(e).css("color", "").find(".loader").fadeOut(function() {
        $(e).find(".loader").remove();
    });
}
//делает высоту элементов одинаковой
function setHeight($e) {
    var h = 0;
    function a($e) {
        $($e).each(function(e) {
            if ($(this).outerHeight() > h) {
                h = $(this).outerHeight();
            }
        });
        $($e).outerHeight(h);
    }
    a($e);
    $(window).resize(function () {
        a($e);
    });
}