const apiKey = '223aedbd1377460cafe02500242806'
const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=london&days=3`
console.log(api);


async function getWeather(){
    let response = await fetch(api)
    let myData = await response.json()
   return myData
}


function displayTodayData(data){
    // console.log(data.current);

    document.getElementById("city").innerHTML = data.location.name
    document.getElementById("country").innerHTML = data.location.country
    document.getElementById("degree").innerHTML = data.current.temp_c + `<sup>o</sup>C`
    document.getElementById("statusImg").setAttribute('src', data.current.condition.icon)
    document.getElementById("statusText").innerHTML = data.current.condition.text

    document.getElementById("humidity").innerHTML = data.current.humidity + '%'
    document.getElementById("wind_kph").innerHTML = data.current.wind_kph + 'km/h'
    document.getElementById("wind_dir").innerHTML = data.current.wind_dir
}

function displayNextData(data){
    let forcastData = data.forecast.forecastday
    console.log(forcastData)

    let cartona = ""
    for(let i=0; i<forcastData.length - 1; i++){
        cartona += 
            `<div class="col-lg-4 text-center">
                <div class="date d-flex justify-content-between">
                    <span>Friday</span>
                    <span>28 june</span>
                </div>
                <div class="weather">
                <img class="statusImg" src="${forcastData[i+1].day.condition.icon}">
                    <div class="fs-1 fw-bold">${forcastData[i+1].day.maxtemp_c}<sup>o</sup>C</div>
                    <div class="text-secondary">${forcastData[i+1].day.mintemp_c}<sup>o</sup>C</div>
                    <span class="status">${forcastData[i+1].day.condition.text}</span>
                </div>
            </div>`
    }
    document.querySelector('.weather-container .row').innerHTML += cartona
}

// start app
async function startApp(){
    let weatherData = await getWeather()
    displayTodayData(weatherData)
    displayNextData(weatherData)
}
startApp()