function headerTransition() {
    //изменение состояния хедера в зависимости от прокрутки страницы
    let scrlTop = $(document).scrollTop();
    if ((scrlTop >= ($('.howItWorksScreen').offset().top - 1) && (scrlTop <= ($('.whyUsScreen').offset().top + 1))) ||
        (scrlTop >= ($('.faqScreen').offset().top - 1) && (scrlTop <= ($('footer').offset().top + 1))))
    {
        $('.mainHeader').addClass('white');
    }
    else {
        $('.mainHeader').removeClass('white');
    }
}

function scrollToAncor(ancorId) {
    let top = $(ancorId).offset().top;

    $('body,html').animate({scrollTop: top}, {
        duration: 400,
        specialEasing: {
            scrollTop: 'easeInOutCubic'
        }
    });
}

function comparisonSpinner() {

    $('.marketPrice__slider').slick({
        infinite: true,
        vertical: true,
        arrows: true,
        appendArrows: '.market__spin',
        prevArrow: '<span class="spin__up"></span>',
        nextArrow: '<span class="spin__down"></span>',
        verticalDraggable: false,
        slidesToShow: 1,
        asNavFor: '.economyPrice__slider, .economyPercent__slider',
        draggable: false
    });

    $('.economyPrice__slider').slick({
        infinite: true,
        vertical: true,
        arrows: false,
        verticalDraggable: false,
        slidesToShow: 1,
        draggable: false

    });

    $('.economyPercent__slider').slick({
        infinite: true,
        vertical: true,
        arrows: false,
        verticalDraggable: false,
        slidesToShow: 1,
        draggable: false
    });
}


//смена текущего вопроса в F.A.Q.
function toggleQuestion(nextActiveNum) {
    let curActiveNum = parseInt($('.questions__item.active').attr('data-question'));
    //если новый номер не совпадает с текущим, то меняем
    if (nextActiveNum != curActiveNum) {
        //снимаем active со всех элементов (читай: с любого который active)
        $('.questions__item').removeClass('active');
        //вещаем active на новый элемент
        $('.questions__item[data-question="' + nextActiveNum + '"]').addClass('active');
    }

}

//функционал скрина F.A.Q.
function faqSlider() {

    //слайдер ответов
    var answersSlider = $('.answersSlider');
    answersSlider.slick({
        arrows: false,
        fade: true,
        speed: 500
    })

    //границы диапазонов каждого вопроса
    //для слайдера
    var ranges = [
        {
            top: 100,
            bottom: 85.7143,
        },
        {
            top: 85.7143,
            bottom: 71.4286,
        },
        {
            top: 71.4286,
            bottom: 57.1429,
        },
        {
            top: 57.1429,
            bottom: 42.8571,
        },
        {
            top: 42.8571,
            bottom: 28.5714,
        },
        {
            top: 28.5714,
            bottom: 14.2857,
        },
        {
            top: 14.2857,
            bottom: 0,
        }
    ]

    //слайдер (ползунок) вопросов
    $('.faqSlider').slider({
        orientation: 'vertical',
        range: 'min',
        min: 0,
        max: 100,
        value: 60,
        animate: 400,
        slide: function( event, ui ) {
            let val = ui.value;

            //числа в if'ах - границы диапазонов каждого вопроса
            //слайдер разбит на 7 диапазонов
            if (val <= ranges[0].top && val > ranges[0].bottom) {
                toggleQuestion(0);
                answersSlider.slick('slickGoTo', '0');
            }

            else if (val <= ranges[1].top && val > ranges[1].bottom) {
                toggleQuestion(1);
                answersSlider.slick('slickGoTo', '1');
            }

            else if (val <= ranges[2].top && val > ranges[2].bottom) {
                toggleQuestion(2);
                answersSlider.slick('slickGoTo', '2');
            }

            else if (val <= ranges[3].top && val > ranges[3].bottom) {
                toggleQuestion(3);
                answersSlider.slick('slickGoTo', '3');
            }

            else if (val <= ranges[4].top && val > ranges[4].bottom) {
                toggleQuestion(4);
                answersSlider.slick('slickGoTo', '4');
            }

            else if (val <= ranges[5].top && val > ranges[5].bottom) {
                toggleQuestion(5);
                answersSlider.slick('slickGoTo', '5');
            }

            else if (val <= ranges[6].top && val >= ranges[6].bottom) {
                toggleQuestion(6);
                answersSlider.slick('slickGoTo', '6');
            }
        }
    });

    //начальная позиция
    toggleQuestion(3);
    let midRangeSliderPos = (ranges[3].top - ranges[3].bottom) / 2 + ranges[3].bottom;
    $('.faqSlider').slider('option', 'value', midRangeSliderPos);
    answersSlider.slick('slickGoTo', '3');

    //изменение активного вопроса по клику
    $('.questions__item').on('click', function (e) {
        let num = $(this).attr('data-question')
        toggleQuestion(num);
        //вычисляем середину диапазона вопроса на слайдере
        let midRangeSliderPos = (ranges[num].top - ranges[num].bottom) / 2 + ranges[num].bottom;
        //устанавливаем слайдер в вычисленную позицию
        $('.faqSlider').slider('option', 'value', midRangeSliderPos);
        //изменяем слайдер ответов
        answersSlider.slick('slickGoTo', num);
    });
}

$(function () {

    //функционал кнопки "вниз" на первом скрине
    $('.ancorTrigger').on('click', function (e) {
        e.preventDefault();
        let ancor = $(this).attr('href');
        scrollToAncor(ancor);
    })

    //чек хедера при загрузке страницы
    headerTransition();

    //инициализация спиннера на скрине сравнения
    comparisonSpinner();

    //инициализация слайдера на скрине faq
    faqSlider();

    var controls = {
        video: $(".videoHF"),
        playpause: $(".playAndPause")
    };

    var video = controls.video[0];

    /*действия при нажатии Play и Pause*/
    controls.playpause.click(function(){
        if (video.paused) {
            video.play();
            $(".howToWork__videoControls").addClass("paused");
        } else {
            video.pause();
            $(".howToWork__videoControls").removeClass("paused");
        }
    });

    /*определяем конец видео*/
    video.onended = function(e) {
        $(".howToWork__videoControls").removeClass("paused");
        console.log("finish");
    };

    //селект-меню в калькуляторе
    $('#purposeSelect').selectmenu();
    $('#activitiesSelect').selectmenu();

    //изменение состояния хедера при скроле
    $(window).on('scroll', function(e) {
        headerTransition();
    })


    /*Плавное прокручивание при скролле*/
    var screens = [];
    var currentAnchor = -1;
    var isAnimating  = false;



    /*
    function updateScreens() {
        screens = [];
        $('.screen').each(function(i, element){
            screens.push( $(element).offset().top );
        });
    }

    $('body').on('mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        if( isAnimating ) {
            return false;
        }
        isAnimating  = true;
        // Increase or reset current anchor
        if( e.originalEvent.wheelDelta >= 0 ) {
            currentAnchor--;
        }else{
            currentAnchor++;
        }
        if( currentAnchor > (screens.length - 1)
           || currentAnchor < 0 ) {
            currentAnchor = 0;
        }
        isAnimating  = true;
        $('html, body').animate({
            scrollTop: parseInt( screens[currentAnchor] )
        }, 500, 'swing', function(){
            isAnimating  = false;
        });
    });

    updateScreens();   */


    // функция создаёт таб виджет по переданным классам и id
    function makeTabWidget(args) {
        $('#' + args.containerId).find('.' + args.tabClass).on('click', function (e) {
            let currentTabNum = $(this).attr('tabindex');
            $('.' + args.tabClass).removeClass(args.tabActiveClass);
            $(this).addClass(args.tabActiveClass);
            let contentElements = $('.' + args.contentClass);
            contentElements.removeClass(args.contentActiveClass);
            contentElements.eq(currentTabNum).addClass(args.contentActiveClass);
        });
    }


    $(function () {
        makeTabWidget({
            containerId: 'js-Tabs',
            contentClass: 'js-tabWidget__content',
            contentActiveClass: 'js-tabWidget__content_current_yes',
            tabClass: 'js-tabWidget__tab',
            tabActiveClass: 'js-tabWidget__tab_active_yes'
        });

    });


})
