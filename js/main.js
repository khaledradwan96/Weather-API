const apiKey = '223aedbd1377460cafe02500242806'
const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=london&days=3`
console.log(api);


async function getWeather(){
    let response = await fetch(api)
    let myData = await response.json()

    console.log(myData)
    console.log(myData.forecast)
    console.log(myData.forecast.forecastday)
    console.log(myData.forecast.forecastday[0].date)

   return myData
}


