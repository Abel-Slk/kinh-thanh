if ($('.slider').length > 0) {
	$('.slider').slick({
		autoplay: true,
		dots: true,
		accessibility: false,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}