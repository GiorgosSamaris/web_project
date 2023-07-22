
function include_file(file) {
 
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
 
    document.getElementsByTagName('head').item(0).appendChild(script);
 
}

function markerClick(event){
    this.getPopup() /* this refers to the object that created the event -> marker in our case */
    .setLatLng(event.latlng)
    .setContent("Συντεταγμένες σημείου: " + event.latlng.toString());
}

include_file("http://labs.easyblog.it/maps/leaflet-search/src/leaflet-search.js");

let mymap = L.map('mapid');
let tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
mymap.setView([38.2462420, 21.7350847], 16);
let marker = L.marker([38.2462420, 21.7350847], {draggable: "true"}).addTo(mymap);
marker.bindPopup("<b>Πλατεία Γεωργίου<b>").openPopup();
marker.on("click", markerClick);


let data = [{loc: [21.7352181, 38.2466877], title: "Zizu"}]; 
var markersLayer= new L.LayerGroup();  /* groups layers(a marker is a layer) */
mymap.addLayer(markersLayer); 
let controlSearch= new L.Control.Search(
    { position: "topright",
    layer:markersLayer, 
    initial: false, 
    zoom: 15, 
    marker: false}); 
mymap.addControl(controlSearch); 
for (i in data) { 
    let title = data[i].title; 
    let loc = data[i].loc; 
    let marker = L.marker(L.latLng(loc), {title: title});     
    marker.bindPopup("title: " + title); 
    marker.addTo(markersLayer); /* add marker points to layer group */
}




