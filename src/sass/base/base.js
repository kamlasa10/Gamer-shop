$(document).ready(function () {
    //переключение табов в товаре
    $(".tab-link").on("click", function(e) {
        $(this).closest(".tab").find(".tab-panel").removeClass("active");
        $($(this).attr("href")).addClass("active");
        $(".tab-link").removeClass("active");
        $(this).addClass("active");
        return false
    });
    //подчеркивание вкладок при ховере
    $(".tab-nav").append("<div class='border'></div>");

    $(".tab-link").hover(function(e) {
            tabBorder($(this));
        },
        function(e) {
            tabBorder($(".tab-link.active"));
        });


    //зум фото товара при ховере
    if ($("body").width() > 991) {
        $('.picZoomer').picZoomer();
    }
    $('.piclist li').on('click',function(event){
        var $pic = $(this).find('img');
        $('.picZoomer-pic').attr('src',$pic.attr('src'));
    });

    //рейтинг товара
    $('.js-star-rating').rating();

    //стилизация селекта количества товаров
    $('.js-styler').styler();

    //раскрытие меню в телефоне
    if ($("body").width() < 991) {
        $(".gamburger").clone().addClass("open").appendTo(".mobile-toggle");
    }
    $(".gamburger").on("click", function(e) {
        $(".mobile-toggle").toggleClass("open");
    });

    //форма поиска в шапке
    $(".top-menu__search").on("click", function(e) {
        if (!$(this).hasClass("active")) {
            $(".search-form").width($(".mobile-toggle").width() + 80);
            $(this).addClass("active");
            $(".search-form__input").focus();
            addCloseEvent();
        }
    });
    function addCloseEvent() {
        $(document).one("click", function(event) {
            if ($(event.target).closest(".top-menu__search").length) {
                addCloseEvent();
                return
            }
            $(".top-menu__search").removeClass("active");
            event.stopPropagation();
        });
    }

    //анимация загрузки
    $("body > *").each(function(i) {
        $(this).addClass("animate").css("animation-delay", 0.2*i + "s");
    });
    tabBorder($(".tab-link.active"));
});
function tabBorder(e) {
    var b = e.width(),
        c = (e.outerWidth(true) - b) / 2,
        d = e.position().left;
    $(".border").css("left", d + c).css("width", b)
}