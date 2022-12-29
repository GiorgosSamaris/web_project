let mymap = L.map('mapid');
let tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
mymap.setView([38.2462420, 21.7350847], 16);
let marker = L.marker([38.2462420, 21.7350847], {draggable: "true"}).addTo(mymap);
marker.bindPopup("<b>Πλατεία Γεωργίου<b>").openPopup();
marker.on("click", markerClick);

function markerClick(event){
    this.getPopup() /* this refers to the object that created the event -> marker in our case */
    .setLatLng(event.latlng)
    .setContent("Συντεταγμένες σημείου: " + event.latlng.toString());
}

let data = [{loc: [21.7352181, 38.2466877], title: "Zizu"}]; 
var markersLayer= new L.LayerGroup();  /* groups layers(a makrer is a layer) */
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

