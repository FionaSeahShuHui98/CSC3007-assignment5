// Check if JS File is connected
// alert('Connected')

let tiles = new L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
  detectRetina: true,
  maxZoom: 20,
  minZoom: 11,
  attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
               'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
});

let map = new L.Map('map', {center: [1.347833, 103.809357], zoom: 12})
    .addLayer(tiles);

fetch ("https://api.data.gov.sg/v1/environment/psi").then ((psi_data) => {

    return psi_data.json();

}).then(function(psi_object) {

    var metric = Object.keys(psi_object.items[0].readings);
    var length = metric.length;

    for (let i = 0; i < length; i++) {
        var central_column =  Object.values(psi_object.items[0].readings)[i].central
        var west_column =  Object.values(psi_object.items[0].readings)[i].west
        var east_column =  Object.values(psi_object.items[0].readings)[i].east
        var north_column =  Object.values(psi_object.items[0].readings)[i].north
        var south_column =  Object.values(psi_object.items[0].readings)[i].south

        central_column += central_column;
        west_column += west_column
        east_column += east_column
        north_column += north_column
        south_column += south_column
    } 

    // console.log(central_column.toString())
    // console.log(west_column)
    // console.log(east_column)
    // console.log(north_column)
    // console.log(south_column)

    var circle_west = L.circle([psi_object.region_metadata[0].label_location.latitude, psi_object.region_metadata[0].label_location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);

    circle_west.bindPopup(west_column.toString());

    var circle_east = L.circle([psi_object.region_metadata[2].label_location.latitude, psi_object.region_metadata[2].label_location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);

    circle_east.bindPopup(east_column.toString());

    var circle_central = L.circle([psi_object.region_metadata[3].label_location.latitude, psi_object.region_metadata[3].label_location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);

    circle_central.bindPopup(central_column.toString());

    var circle_south = L.circle([psi_object.region_metadata[4].label_location.latitude, psi_object.region_metadata[4].label_location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);

    circle_south.bindPopup(south_column.toString());

    var circle_north = L.circle([psi_object.region_metadata[5].label_location.latitude, psi_object.region_metadata[5].label_location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map);

    circle_north.bindPopup(north_column.toString());
})
                    