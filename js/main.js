const apiKey = '223aedbd1377460cafe02500242806'
const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=london&days=3`
console.log(api);


async function getWeather(){
    let response = await fetch(api)
    let myData = await response.json()
   return myData
}


function displayTodayData(data){
    console.log(data);
    console.log(data.current);

    document.getElementById("city").innerHTML = data.location.name
    document.getElementById("country").innerHTML = data.location.country
    document.getElementById("degree").innerHTML = data.current.temp_c + `<sup>o</sup>C`
    document.getElementById("statusImg").setAttribute('src', data.current.condition.icon)
    document.getElementById("statusText").innerHTML = data.current.condition.text

    document.getElementById("humidity").innerHTML = data.current.humidity + '%'
    document.getElementById("wind_kph").innerHTML = data.current.wind_kph + 'km/h'
    document.getElementById("wind_dir").innerHTML = data.current.wind_dir
}


// start app
async function startApp(){
    let weatherData = await getWeather()
    displayTodayData(weatherData)
}
startApp()