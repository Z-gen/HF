function headerTransition() {
    //изменение состояния хедера в зависимости от прокрутки страницы
    if ($(document).scrollTop() >= ($(document).height() - $('.firstScreen').height())) {
        $('header').addClass('white');
    }
    else {
        $('header').removeClass('white');
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

$(function () {

    //функционал кнопки "вниз" на первом скрине
    $('.ancorTrigger').on('click', function (e) {
        e.preventDefault();
        let ancor = $(this).attr('href');
        scrollToAncor(ancor);
    })

    //чек хедера при загрузке страницы
    headerTransition();

    //изменение состояния хедера при скроле
    $(window).on('scroll', function(e) {
        headerTransition();
    })
})




$(document).ready(function(){

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

    

}); 