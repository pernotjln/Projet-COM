
$(document).ready(function(){
	$("nav").sticky({topSpacing:0});
});

function scrollTo(target){
	var targetPosition = $(target).offset().top;
	$('html,body').animate({ scrollTop: targetPosition}, 'slow');
}

$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: true,
		slideshowSpeed: 4500,
		animationSpeed: 1000
	});
});

$(document).ready(function(){
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false,
		theme: 'light_square'
	});
});