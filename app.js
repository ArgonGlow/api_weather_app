// current weather variables
const weatherDiv = document.getElementById('weather')
const weatherIcon = document.getElementById('weather-icon')
const localTime = document.getElementById('local-time')
const currentTemp = document.getElementById('temperature')
const currentTempRange = document.getElementById('temp-range')
const currentWind = document.getElementById('wind')
const currentWindDegrees = document.getElementById('wind-degrees')
const currentWindSpeed = document.getElementById('wind-speed')
const currentWindDirection = document.getElementById('wind-direction')

// tomorrow's weather variables
const tomorrowWeather = document.getElementById('t-weather')
const tomorrowWeatherIcon = document.getElementById('t-weather-icon')
const tomorrowlocalTime = document.getElementById('t-local-time')
const tomorrowTemp = document.getElementById('t-temperature')
const tomorrowTempRange = document.getElementById('t-temp-range')
const tomorrowWind = document.getElementById('t-wind')
const tomorrowWindDegrees = document.getElementById('t-wind-degrees')
const tomorrowWindSpeed = document.getElementById('t-wind-speed')
const tomorrowWindDirection = document.getElementById('t-wind-direction')

const userLocation = document.getElementById('location')

// api call inputs
let geoLat = 51.8428463 // fallback latitude, Nijmegen
let geoLong = 5.7630919 // fallback longitude, Nijmegen
const appId = "dcfd021c6615b1778fb5edd7211abf49"
let excluded = "" // comma delimited string. options are: current, minutely, hourly, daily, alerts
let units = "metric"

fetchWeatherData() // populate screen based on default coordinates
getUserLocation()


const selector = document.getElementById('#cities')

selector.onclick = 

function fetchWeatherData(location) {
    if (location !== undefined) {
        geoLat = location.coords.latitude
        geoLong = location.coords.longitude
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoLat}&lon=${geoLong}&exclude=${excluded}&units=${units}&appid=${appId}`)
    .then(response => response.json())
    .then(data => getWeather(data))

    .catch(console.error)
}

// weather data to HTML page
function getWeather(data) {

    let windDegrees = data.current.wind_deg
    let windDirection = windCardinal(windDegrees)
    let tWindDegrees = data.daily[1].wind_deg
    let tWindDirection = windCardinal(tWindDegrees)
    let curTimeDate = new Date(data.current.dt * 1000)
    let tomTimeDate = new Date(data.daily[1].dt * 1000)
    
    curTimeDate = curTimeDate.toDateString()
    tomTimeDate = tomTimeDate.toDateString()

    // userLocation.innerHTML = `${data.lat}, ${data.lon}, ${data.timezone}`
    localTime.innerText = `${curTimeDate.slice(0, 3)}
    ${curTimeDate.slice(4,-5)}`
    // localTime.innerText = `${data.timezone}
    // ${curTimeDate}`
    weatherDiv.innerText = `${data.current.weather[0].main}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`
    currentTemp.innerText = `${data.current.temp.toString().split('.')[0]}°C`
    currentTempRange.innerText = `${data.daily[0].temp.min.toString().split('.')[0]}/${data.daily[0].temp.max.toString().split('.')[0]}°`
    currentWindDegrees.innerText = `(${windDegrees}°)\n\n`
    currentWindDirection.innerText = `${windDirection}`
    currentWindSpeed.innerText = `${data.current.wind_speed.toString().split('.')[0]} m/s`

    tomorrowlocalTime.innerText = `${tomTimeDate.slice(0,3)}
    ${tomTimeDate.slice(4,-5)}`
    tomorrowWeather.innerText = `${data.daily[1].weather[0].main}`
    tomorrowWeatherIcon.src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@4x.png`
    tomorrowTemp.innerText = `${data.daily[1].temp.max.toString().split('.')[0]}°C`
    tomorrowTempRange.innerText = `${data.daily[1].temp.min.toString().split('.')[0]}/${data.daily[1].temp.max.toString().split('.')[0]}°`
    tomorrowWindDegrees.innerText = `(${tWindDegrees}°)\n\n`
    tomorrowWindDirection.innerText = `${tWindDirection}`
    tomorrowWindSpeed.innerText = `${data.daily[1].wind_speed.toString().split('.')[0]} m/s`
}

// convert direction in degrees to cardinal directions
function windCardinal(windDegrees) {
    let windDirection = ''
    
    if (windDegrees > 337.5 && windDegrees < 22.5) {
        windDirection = 'N'
    } else if (windDegrees > 292.5) {
        windDirection = "NW"
    } else if (windDegrees > 247.5) {
        windDirection = 'W'
    } else if (windDegrees > 202.5) {
        windDirection = 'SW'
    } else if (windDegrees > 157.5) {
        windDirection = 'S'
    } else if (windDegrees > 112.5) {
        windDirection = 'SE'
    } else if (windDegrees > 67.5) {
        windDirection = 'E'
    } else {
        windDirection = 'NE'
    }
    return windDirection
}

// request location permission from user
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData, showError)
    } else {
        console.log("Geolocation not supported.")
    }
}

// show possible errors on HTML page
function showError() {
    // userLocation.innerHTML = "no bueno"
    fetchWeatherData(undefined)
}