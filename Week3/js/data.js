let schools = [
    {
        'id' : 0,
        'title':'Fairgrove Elementary School',
        'comment':'Kindergarten - 4th',
        'lat': 35.10844301696633,
        'lon': -120.60568419358802,
        'img': './images/fairgrove.jpg',
    },
    {
        'id' : 1,
        'title':'St. Patrick\'s Elementary School',
        'comment':'5th - 8th',
        'lat': 35.12701811902243,
        'lon': -120.59163245340065,
        'img': './images/middle.jpeg'
    },
    {
        'id' : 2,
        'title':'Mission College Prep',
        'comment':'High School',
        'lat': 35.28189436170044,
        'lon': -120.66622610811969,
        'img': './images/mcp.jpeg'
    },
    {
        'id' : 3,
        'title':'Cuesta College',
        'comment':'Community College',
        'lat': 35.34297350162858, 
        'lon': -120.74419278128046,
        'img': './images/cuesta.jpeg'
    },
    {
        'id' : 4,
        'title':'University of California, Los Angeles',
        'comment':'B.S. and M.S.',
        'lat': 34.06887886151095,
        'lon': -118.44445155856116,
        'img': './images/college.jpeg'
    }
]

var gradcap = new L.Icon({
    iconUrl: './images/locationMarker.png',
    iconSize: [20, 14],
    iconAnchor: [10, 0],
});


// center on 
let map = L.map('map').setView([34.72078199008541, -119.43945363193657], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    id: 'mapbox/streets-v11',
}).addTo(map);

let myMarkers = L.featureGroup();

schools.forEach(item => {
    let marker = L.marker([item.lat,item.lon], {icon: gradcap})
        .bindPopup(`<div id=pop><h3>${item.title}</h3>
            <h4>${item.comment}</h4>
            <img id=im src="${item.img}"></div>`, {maxHeight:'100px'})

    myMarkers.addLayer(marker)

    // add button to the site linking to map locations
    $('#index').append(`<div class="content-item" 
    onclick="flyToIndex(${item.id})"><h4>${item.title}</h4></div>`)
})

myMarkers.addTo(map)

var popup = L.popup();

function onMapClick(e) {
    let mindist = 12450;
    let location = "";
    console.log(e.latlng.lat)
    let lat1 = e.latlng.lat
    let lng1 = e.latlng.lng
    schools.forEach(item => {
        let dist = getDistanceFromLatLonInMi(lat1,lng1,item.lat,item.lon)
        if(dist<mindist){
            location = item.title
            mindist = dist
        }
    })
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at (${lat1}, ${lng1}).
        The closest school to you that I have attended is ${location} which is ${mindist.toFixed(2)} miles away.`)
        .openOn(map);
}

map.on('click', onMapClick);

// src: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 7917.5117 * Math.asin(Math.sqrt(a)); // 2 * R * 0.62137119; R = 6371 km
}

//define layers
let layers = {
	"Schools":myMarkers
}

//add layer control box
L.control.layers(null,layers).addTo(map)
map.fitBounds(myMarkers.getBounds())

//add button on map for default view
L.easyButton('fa-globe', function(btn,map){
	map.fitBounds(myMarkers.getBounds())
}, 'default view').addTo(map)

function flyToIndex(index){
    map.flyTo([schools[index].lat,schools[index].lon],14)
    myMarkers.getLayers()[index].openPopup()
}

//// slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
        