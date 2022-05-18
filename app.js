const weatherDiv = document.getElementById('weather')
const weatherIcon = document.getElementById('weather-icon')
const localTime = document.getElementById('local-time')
const currentTemp = document.getElementById('temperature')
const currentWind = document.getElementById('wind')
const currentWindDegrees = document.getElementById('wind-degrees')
const currentWindSpeed = document.getElementById('wind-speed')
const currentWindDirection = document.getElementById('wind-direction')

const tomorrowWeather = document.getElementById('t-weather')
const tomorrowWeatherIcon = document.getElementById('t-weather-icon')
const tomorrowlocalTime = document.getElementById('t-local-time')
const tomorrowTemp = document.getElementById('t-temperature')
const tomorrowWind = document.getElementById('t-wind')
const tomorrowWindDegrees = document.getElementById('t-wind-degrees')
const tomorrowWindSpeed = document.getElementById('t-wind-speed')
const tomorrowWindDirection = document.getElementById('t-wind-direction')



let latitude = 51.8428463
let longitude = 5.7630919
let excluded = "" // comma delimited string. options are: current, minutely, hourly, daily, alerts
let units = "metric"
let apiResonse

const apiAddress = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${excluded}&units=${units}&appid=dcfd021c6615b1778fb5edd7211abf49`

fetch(apiAddress)
    .then(response => response.json())
    .then(data => getWeather(data))

    .catch(console.error)

function getWeather(data) {

    let windDegrees = data.current.wind_deg
    let windDirection = ''
    let tWindDegrees = data.daily[0].wind_deg
    let tWindDirection = ''

    console.log(windDirection)

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

    if (tWindDegrees > 337.5 && tWindDegrees < 22.5) {
        tWindDirection = 'N'
    } else if (tWindDegrees > 292.5) {
        tWindDirection = "NW"
    } else if (tWindDegrees > 247.5) {
        tWindDirection = 'W'
    } else if (tWindDegrees > 202.5) {
        tWindDirection = 'SW'
    } else if (tWindDegrees > 157.5) {
        tWindDirection = 'S'
    } else if (tWindDegrees > 112.5) {
        tWindDirection = 'SE'
    } else if (tWindDegrees > 67.5) {
        tWindDirection = 'E'
    } else {
        tWindDirection = 'NE'
    }

    let curTimeDate = new Date(data.current.dt*1000)
    let tomTimeDate = new Date(data.daily[0].dt*1000)

    localTime.innerText = `${curTimeDate.toDateString().slice(0,-5)}`
    weatherDiv.innerText = `${data.current.weather[0].main}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`
    currentTemp.innerText = `${data.current.temp.toString().slice(0,-1)}°C`
    currentWindDegrees.innerText = `(${windDegrees}°)\n\n`
    currentWindDirection.innerText = `${windDirection}`
    currentWindSpeed.innerText = `${data.current.wind_speed.toString().split('.')[0]} m/s`

    tomorrowlocalTime.innerText = `${tomTimeDate.toDateString().slice(0,-5)}`
    tomorrowWeather.innerText = `${data.daily[0].weather[0].main}`
    tomorrowWeatherIcon.src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@4x.png`
    tomorrowTemp.innerText = `${data.daily[0].temp.max.toString().slice(0,-1)}°C`
    tomorrowWindDegrees.innerText = `(${tWindDegrees}°)\n\n`
    tomorrowWindDirection.innerText = `${tWindDirection}`
    tomorrowWindSpeed.innerText = `${data.daily[0].wind_speed.toString().split('.')[0]} m/s`
}