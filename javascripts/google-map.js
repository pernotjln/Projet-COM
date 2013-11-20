var map;

function initialize() {
	var home = new google.maps.LatLng(43.6049937, 1.4441059);
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

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
	document.body.appendChild(script);
}

window.onload = loadScript;