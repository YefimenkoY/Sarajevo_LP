(function() {

    var wow = new WOW(
        {
            boxClass:     'wow',
            animateClass: 'animated',
            offset:       0,
            mobile:       true,
            live:         true,
            scrollContainer: null
        }
    ).init();

    $(function() {

        var links = $('.socials a')
                .add('.hover-img a')
                .add('.right a'),
            scrollTo = $('.discuss-forms');

        var setAnimation = function(elem, typeAnimation, duration, delay) {
            var count = 0;

            if ( count > (delay * 3) ) count = 0;

            elem.each(function(_, elem) {
                var $elem = $(elem);

                $elem.addClass('wow');
                $elem.addClass(typeAnimation);
                $elem.attr('data-wow-duration', duration);
                $elem.attr('data-wow-delay', (count += delay) + 's');
            })
        };

        setAnimation($('.features-list li'), 'fadeInUp', '1s', 0.3);
        setAnimation($('.feature-left li'), 'bounceInLeft', '.6s', 0);
        setAnimation($('.feature-right li'), 'bounceInRight', '1s', 0);
        setAnimation($('.nav li'), 'fadeInDown', '1s', 0.1);
        setAnimation($('.works-img'), 'fadeInLeftBig', '1s', 0);
        setAnimation($('.works-tab'), 'fadeInUp', '1s', 0);
        setAnimation($('.team-list li'), 'fadeInUp', '1s', 0.3);
        setAnimation($('.fact-list li'), 'flipInX', '1s', 0.3);
        setAnimation($('.forms-social a'), 'bounceInRight', '1s', 0);
        setAnimation($('.button i, input[type="submit"]'), 'bounceInUp', '1s', 0);

        links.each(function() {
            var $this = $(this);

           $this.on('click', function(e) {
               e.preventDefault();

               $('body').animate({
                   scrollTop: scrollTo.offset().top - scrollTo.innerHeight()
               }, 2000, 'linear')
            });
        })
    })
}());

