$(function() {
	$('button').on('click', function() {
	$('.carousel').slick({
		// lazyLoad: 'ondemand',
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,

	}); 
	})
});