const weather = document.querySelector(".js-date");

const API_KEY = "88cde98db27cf22c402567c901584714";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}

function saveCorrds(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitube = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitube,
        longitude
    };
    saveCorrds(coordsObj);
    getWeather(latitube,longitude);
}

function handleGeoError(){

}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}
function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitube, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();