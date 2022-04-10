let schools = [
    {
    'id' : 0,
    'title':'Fairgrove Elementary School<br> Alyssa\'s 1st Elementary School: Kindergarten - 4th',
    'lat': 35.10844301696633,
    'lon': -120.60568419358802,
    'img': './images/fairgrove.jpg',
    },
    {
    'id' : 1,
    'title':'St. Patrick\'s Elementary School<br> Alyssa\'s 2nd Elementary School: 5th - 8th',
    'lat': 35.12701811902243,
    'lon': -120.59163245340065,
    'img': './images/middle.jpeg'
    },
    {
    'id' : 2,
    'title':'Mission College Prep<br> Alyssa\'s High School',
    'lat': 35.28189436170044,
    'lon': -120.66622610811969,
    'img': './images/mcp.jpeg'
    },
    {
    'id' : 3,
    'title':'Cuesta College<br> Alyssa\'s Community College',
    'lat': 35.34297350162858, 
    'lon': -120.74419278128046,
    'img': './images/cuesta.jpeg'
    },
    {
    'id' : 4,
    'title':'University of California, Los Angeles<br> Alyssa\'s University: B.S. and M.S.',
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
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let myMarkers = L.featureGroup();

schools.forEach(item => {
    let marker = L.marker([item.lat,item.lon], {icon: gradcap})
        .bindPopup(`<div>${item.title}</div>
        <img id=im src="${item.img}" width = 100%>`, {className:'pop'})

    myMarkers.addLayer(marker)

    // add button to the site linking to map locations
    $('.content').append(`<div class="content-item" 
    onclick="flyToIndex(${item.id})">${item.title}</div>`)
})

myMarkers.addTo(map)

map.fitBounds(myMarkers.getBounds())

function flyToIndex(index){
    map.flyTo([schools[index].lat,schools[index].lon],9)
    myMarkers.getLayers()[index].openPopup()
}