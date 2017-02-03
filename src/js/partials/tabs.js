$(function() {
    var isTrue = true;

    $('.works')
        .find('.works-img')
        .eq(0)
        .siblings()
        .not('.container-fluid')
        .hide();
   
    $('.works-tab li').on('click', function(e) {
        e.preventDefault();

        var
            $this = $(this).find('a'),
            wrap = $this.closest('.works'),
            currentTab = $this.end().index()+1,
            worksImg = wrap.find('.works-img').not('img'),
            currworksImg = worksImg.filter(function() {
                return $(this).is('[data-work="'+currentTab+'"]')
            }),
            timeAnimation = 210;

        if (isTrue) {
            isTrue = false;

            if (!$this.is('.tab-active')) {
                $this.addClass('tab-active')
                    .end()
                    .siblings()
                    .find('a')
                    .removeClass('tab-active')
            }

            worksImg.fadeOut(timeAnimation, function() {
                setTimeout(function() {
                    currworksImg.fadeIn(timeAnimation);
                    isTrue = true;
                }, timeAnimation)
            })
        }
        
    });
    
});
