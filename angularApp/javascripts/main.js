(function(window, $) {
    var previousScroll = 0;
    var headerOrgOffset = $('nav').height();
    var foo =function() {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > headerOrgOffset) {
            if (currentScroll > previousScroll) {
                $('nav').fadeOut();
            } else {
                $('nav').fadeIn();
            }
        }
        previousScroll = currentScroll;
    }
    if ($('body').width() < 1000) {
    $('body').on({
        'touchmove': foo
    });
    } else {
    $(window).scroll(foo);
    }
})(window, $);
