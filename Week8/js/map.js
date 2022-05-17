// Global variables
let map;
let lat = 34;
let lon = -118;
let zl = 12;
let path = '';
// put this in your global variables
let jsondata;
let geojson_layer;
let brew = new classyBrew();
let legend = L.control({position: 'bottomright'});
let info_panel = L.control();
let markers = L.featureGroup();



// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
	getJSON();
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to get the json data
function getJSON(){
	$.getJSON('https://data.lacity.org/resource/2nrs-mtv8.json?$order=date_rptd%20desc',function(data){
		console.log(data)
		jsondata = data;
		mapJSON()
	})
}

// function to map a geojson file
function mapJSON(race){
    // 
    race = race ||'';

    // get race filtered data
    if(race !== ''){
        filtered_data = jsondata.filter(item => item.vict_descent === race);
    }else{
        filtered_data = jsondata;
    }
	console.log(filtered_data);

    raceToMap = race;
    // clear layers in case it has been mapped already
	if (geojson_layer){
		geojson_layer.clearLayers()
	}

    mapValues(filtered_data);
	
}

// map values
function mapValues(values){
    markers.clearLayers()
    // circle options
	let circleOptions = {
		radius: 10,
        opacity:0.5,
		weight: 10,
		color: 'white',
		fillColor: 'red',
		fillOpacity: 1
	}

	// loop through each entry
	values.forEach(function(item,index){
		// create a marker
		let marker = L.circleMarker([item.lat,item.lon],circleOptions)
		.on('mouseover',function(){
			this.bindPopup(`<h3>${item.crm_cd_desc}</h3><p>The crime occurred in a ${item.premis_desc} on ${item.date_occ.substring(0,10)}</p>`).openPopup();
            $('.footer').html(`<span style="font-size:0.5em">${item.date_occ.substring(0,10)}</span><br>Victim of <span class='highlighted-text'>${item.crm_cd_desc}</span> is a <span class='highlighted-text'>${item.vict_age}</span> year old of race <span class='highlighted-text'>${item.vict_descent}</span> of gender <span class='highlighted-text'>${item.vict_sex}</span>`);
        })

		// add marker to featuregroup
		markers.addLayer(marker)

	})

	// add featuregroup to map
	markers.addTo(map)

	// fit map to markers
	map.fitBounds(markers.getBounds())
}
