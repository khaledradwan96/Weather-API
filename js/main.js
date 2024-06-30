async function getWeather(cityName){
    const apiKey = "223aedbd1377460cafe02500242806"
    const api = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`
    let response = await fetch(api)
    let myData = await response.json()
    return myData
}


function displayTodayData(data){
    // console.log(data);

    let TodayBox = `
        <!-- Today Date -->
        <div class="col-lg-4">
            <div class="date d-flex justify-content-between">
                <span class="dayName"></span>
                <span id="dayDate"></span>
            </div>
            <div class="weather">
                <div class="location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span id="city">${data.location.name}</span> -
                    <span id="country">${data.location.country}</span>
                </div>
                <div id="degree">${data.current.temp_c}<sup>o</sup>C</div>
                <img id="statusImg" src="${data.current.condition.icon}">
                <span id="statusText">${data.current.condition.text}</span>
                <div class="info">
                    <div>
                        <img src="assets/asset 2.png">
                        <span id="humidity">${data.current.humidity} %</span>
                    </div>
                    <div>
                        <img src="assets/asset 3.png">
                        <span id="wind_kph">${data.current.wind_kph} km/h</span>
                    </div>
                    <div>
                        <img src="assets/asset 4.png">
                        <span id="wind_dir">${data.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('.weather-container .row').innerHTML = TodayBox
}

function displayNextData(data){
    let forcastData = data.forecast.forecastday
    // console.log(forcastData)

    let cartona = ""
    for(let i=0; i<forcastData.length - 1; i++){
        cartona += 
            `<!-- Next ${i+1} day Date -->
            <div class="col-lg-4 text-center">
                <div class="date dayName"></div>
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

function displayDate(data){
    let date = data.forecast.forecastday
    // console.log(date)

    // for Display Day Name
    for(let i=0; i<date.length;i++){
        let dayName = new Date(date[i].date).toLocaleDateString('en-us',{weekday: "long"})
        // console.log(dayName);
        document.querySelectorAll(".dayName")[i].innerHTML = dayName
    }

    // to Display Day Date
    let dayNum = new Date(date[0].date).getDate()
    let dayMonth = new Date(date[0].date).toLocaleDateString('en-us',{month: "long"})
    let dayDate = dayNum + " " + dayMonth
    // console.log(dayDate);
    document.getElementById("dayDate").innerHTML = dayDate
}


// start app
async function startApp(cityName = "cairo"){
    let weatherData = await getWeather(cityName)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
        displayDate(weatherData)
    }
}
startApp()


let searchInput = document.getElementById("searchInput")
searchInput.addEventListener('input', function(){
    // console.log(searchInput.value)
    startApp(searchInput.value)
})

let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener('click', function(e){
    e.preventDefault()
})