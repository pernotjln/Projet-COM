
// Sticky nav
$(document).ready(function(){
	$("nav").sticky({topSpacing:0});
});
	
	
//dropdown menu
	
function scrollTo(target){
	var targetPosition = $(target).offset().top;
	$('html,body').animate({ scrollTop: targetPosition}, 'slow');
}

//slider
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
	
// Google Map

var map;
var home = new google.maps.LatLng(43.6049937, 1.4441059);

function initialize() {
	var mapOptions = {
		zoom: 17,
		center: home,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	marker = new google.maps.Marker({
		position: home,
		map: map,
		animation: google.maps.Animation.DROP,
		title: 'Maison'
	});
	
	marker.setAnimation(google.maps.Animation.BOUNCE);
	
	var contentString = '<br /><br /><h3>Bienvenue chez moi !</h3>' +
						'<br/><p>3 rue Lafayette<br />31000 Toulouse</p>';
						
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
		marker.setAnimation(null);
	});
	
	google.maps.event.addListener(infowindow, 'closeclick', function(){
		marker.setAnimation(google.maps.Animation.BOUNCE);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);