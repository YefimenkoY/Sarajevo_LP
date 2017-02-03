(function() {
   $(function() {
       var headerTop = $('.header-top');
       var features = $('.features');
       var nav = $('.nav li');

       $(window).on('scroll', function() {
           if ($(window).scrollTop() + 200 > features.offset().top) {
               headerTop.addClass('header-active animated slideInDown');
               nav.css({
                   visibility: 'visible'
               })
           } else {
               headerTop.removeClass('header-active animated slideInDown');
           }
       })
   });
}());

(function() {

    $(function() {

        function addHash() {
            $('section, header').each(function() {
                var 
                    $this = $(this),
                    top = $this.offset().top,
                    bottom = top + $this.height(),
                    offSTop = $(window).scrollTop();
                
                if (top-75 < offSTop && bottom-75 > offSTop) {
                    var hash = '#' + $this.data('section');

                    window.location.hash = hash;
                }
            });
        }
        
        $('.nav a').on('click', function(e) {
            e.preventDefault();
            
            var 
                $this = $(this),
                href = $this.attr('href').replace('#', ''),
                currentSect = $('section, header').filter(function() {
                    return $(this).is('[data-section="'+ href +'"]')
                }),
                elem = $this.parent();

            if (!elem.hasClass('nav-active')) {
                setTimeout(function() {
                    elem.addClass('nav-active')
                        .siblings()
                        .removeClass('nav-active');
                }, 200)
            }

            $('body').animate({
                scrollTop: (currentSect.offset().top-70)
            }, 1000);
        });

        $(window).on('scroll', function() {

            $('section, header').each(function() {
                addHash();
            });

            var hash = window.location.hash;

            var a = $('.nav')
                .find('a')
                .filter(function() {
                    return $(this).is('[href="'+hash+'"]')
                })
                .parent()
                .addClass('nav-active')
                .siblings()
                .removeClass('nav-active');
        });
    });
})();
