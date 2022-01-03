//DOM references
let cityInputEl = document.getElementById("city-name")
let searchBtnEl = document.querySelector("search")
let clearBtnEl = document.querySelector("clear")
let historyContEl = document.getElementById("history-buttons")
let weatherDisplayEl = document.getElementById("main-container")
let weatherCityHeaderEl = document.getElementById("city-today")
let temperatureEl = document.getElementById("temperature")
let humidityEl = document.getElementById("humidity")
let wsEl = document.getElementById("windspeed")
let uvEl = document.getElementById("uv-index")
let fiveDayEl = document.getElementById("five-container")

// kelvin to fahreinheit
function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

//global variables
let history = JSON.parse(localStorage.getItem("cities") || [])
// allow page to persist

// api keys
const apikey = "fbce9e166f000ebb199687079f74a400"

//look at one call 
// get number and take number and add it to link that you construct
// current 

function formSubmitHandler() {
    //declare input, val, trim
    let cityname = cityInputEl.value().trim()
    if (cityname) {
        // use current to get lat and lon
        let weatherURL = `` + cityname + `&appid=` + apikey
        fetch(weatherURL).then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data)
                    displayForecast(data.lat, data.lon)
                })
            }
            else {
                alert("Error: City not found.")
            }
                    
        })
            .catch(function (error) {
                alert("Unable to connect to OpenWeather.")
            })
        // set local storage variable
        const cityPast = cityInputEl.value()
        //push it into history array
        history.push(cityPast)
        //set items with key value and stringify history array
        localStorage.setItem("cities", JSON.stringify(history))
        showHistory()
    } //edge case 
    else {
        alert("You must input a city location to retrieve results.")
    }
}
function displayforecast(lat, lon) {
    // use lat and lon to get onecall and forecast
    // create the fetch url in here using lat and lon from the other function
     // make elemtns and append to divs of five-container
    //select forecats
    //make for loop
    //0-4 of array
    let uvURL = `` + lat + lon + `&appid=` + apikey
            // get 5-day forecsat with onecall
            let forecastURL = `` + `&appid=` + apikey
            fetch(forecastURL).then(function (response) {
                console.log(response)
                if (response.ok) {
                    response.json().then(function (data) {
                        displayforecast(data)
                    })
                }
            })
}

// form submit function
//pass in fetch function for queries for location name, date, weather icon, temp, wind, humidity, uv
// pass in function for five day forecast with same data points
//save to local storage 
//display function for both? or two separate ones? does it depend on the parameter?
// pass in function for dynamically creating search history buttons
//use for loop to create elements


// display content function
// innerhtml icon conditions
function displayWeather(data) {
// do all the current conditions stuff

}
// fetch top container
//fetch api with queries using city name and state?
// if response ok then display repo
//define history
// for loop
//get item
// define history btn
//make search history button
// search history button add event listener for two functions?
//appendchild to hsitory container

function showHistory() {
    for (let i = 0; i < history.length; i++) {
        let historyBtn = document.createElement("button")
        historyBtn.textContent = history[i]
        historyBtn.addEventListener("click", function () {
            formSubmitHandler(historyBtn.textContent)
        })
        historyContEl.appendChild(historyBtn)
    }
}

function clearHistory() {
    // clear local storage
    localStorage.clear()
    //render onto page
    showHistory()
}

// search button add event listener
// form submit function launch
searchBtnEl.addEventListener("submit", formSubmitHandler)
// clear history button clear function
clearBtnEl.addEventListener("click", clearHistory)






