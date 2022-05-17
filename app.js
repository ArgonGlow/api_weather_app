const weatherIcon = document.getElementById('weather-icon')
const localTime = document.getElementById('local-time')
const weatherDiv = document.getElementById('weather')
const currentTemp = document.getElementById('temperature')
const currentWind = document.getElementById('wind')
const currentWindDegrees = document.getElementById('wind-degrees')
const currentWindSpeed = document.getElementById('wind-speed')
const currentWindDirection = document.getElementById('wind-direction')

const tomorrowWeatherIcon = document.getElementById('t-weather-icon')
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

    weatherDiv.innerText = `${data.current.weather[0].main}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`
    currentTemp.innerText = `${data.current.temp.toString().slice(0,-1)}°C`
    currentWindDegrees.innerText = `(${windDegrees}°)\n\n`
    currentWindDirection.innerText = `${windDirection}`
    currentWindSpeed.innerText = `${data.current.wind_speed.toString().split('.')[0]} m/s`

    tomorrowWeatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`
    tomorrowTemp.innerText = `${data.current.temp.toString().slice(0,-1)}°C`
    tomorrowWindDegrees.innerText = `(${windDegrees}°)\n\n`
    tomorrowWindDirection.innerText = `${windDirection}`
    tomorrowWindSpeed.innerText = `${data.current.wind_speed.toString().split('.')[0]} m/s`
    

}