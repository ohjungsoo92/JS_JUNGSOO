const weather = document.querySelector(".js-weather");

const API_KEY = "c6e37d1919245376b243b5bc78125b08";

const COORDS = "coords";

function getWeather(lat, lng) {
  //get wether information in API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `Temp : ${temperature} °C  Place : ${place}`;
    });
}

function saveCords(cordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(cordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const cordsObj = {
    //when variation and keys names are same,
    latitude: latitude, //=latitude,
    longitude: longitude //=longitude
  };
  saveCords(cordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCords();
}

init();
