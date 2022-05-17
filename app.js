const weatherIcon = document.getElementById('weather-icon')
const localTime = document.querySelector('#local-time')
const weatherDiv = document.querySelector('#weather')
const currentTemp = document.querySelector('#temperature')
const currentWind = document.querySelector('#wind')

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
    // weatherDiv.innerText = `Current weather: ${data.current.weather[0].main}/${data.current.weather[0].description}`
    // weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
    // currentTemp.innerText = `Current temperature: ${data.current.temp} Celcius`
    // hourlyTemp.innerText = data.hourly[1].temp

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

    // weatherDiv.innerText = `Current weather: ${data.current.weather[0].main}/${data.current.weather[0].description}`
    weatherDiv.innerText = `${data.current.weather[0].main}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
    currentTemp.innerText = `${data.current.temp.toString().slice(0,-1)}°C`
    currentWind.innerText = `${windDirection}, ${windDegrees}°
    ${data.current.wind_speed} m/s`
}