function initMap() {
  var dorsten = {lat: 51.674, lng: 6.966};
  var neuss = {lat: 51.206, lng:6.683};
  var muenster = {lat: 51.960, lng:7.625};
  var hamburg = {lat: 53.542, lng:9.993};
  var schweiz = {lat:46.803, lng:8.455};
  // var muenster = {lat:, lng: };
  var map = new google.maps.Map(document.getElementById('map'), {
    center: dorsten,
    scrollwheel: false,
    zoom: 6
  });
  var infoWindowContent = '';

  var markerMarvin = new google.maps.Marker({
    map: map,
    position: dorsten,
    title: 'Marvin'
  });
  var markerJones = new google.maps.Marker({
    map: map,
    position: muenster,
    title: 'Jones'
  });
  var markerRonny = new google.maps.Marker({
    map: map,
    position: hamburg,
    title: 'Ronny'
  });
  var markerRalf = new google.maps.Marker({
    map: map,
    position: neuss,
    title: 'Ralf'
  });
  var markerRene = new google.maps.Marker({
    map: map,
    position: schweiz,
    title: 'René'
  });
  markerMarvin.addListener('click', function() {
    infoWindowContent = '<h1>Marvin</h1><a href=/glossbosse/marvin>Marvins Beiträge</a>';
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infowindow.open(map, markerMarvin);
  });
  markerJones.addListener('click', function() {
    infoWindowContent = '<h1>Jones</h1><a href=/glossbosse/jones>Jones Beiträge</a>';
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infowindow.open(map, markerJones);
  });
  markerRonny.addListener('click', function() {
    infoWindowContent = '<h1>Ronny</h1><a href=/glossbosse/ronny>Ronnys Beiträge</a>';
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infowindow.open(map, markerRonny);
  });
  markerRalf.addListener('click', function() {
    infoWindowContent = '<h1>Ralf</h1><a href=/glossbosse/ralf>Ralfs Beiträge</a>';
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infowindow.open(map, markerRalf);
  });
  markerRene.addListener('click', function() {
    infoWindowContent = '<h1>René</h1><a href=/glossbosse/rene>Renés Beiträge</a>';
    var infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infowindow.open(map, markerRene);
  });
}
