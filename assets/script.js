//DOM references
let cityInputEl = document.getElementById("city-name")
let searchBtnEl = document.querySelector(".search")
let clearBtnEl = document.querySelector(".clear")
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
let history = JSON.parse(localStorage.getItem("cities")) || []
// ****returning error, maybe make it not global 
// allow page to persist
// api key
const apikey = "fbce9e166f000ebb199687079f74a400"

// form submit function
//pass in fetch function for queries for location name, date, weather icon, temp, wind, humidity, uv
// pass in function for five day forecast with same data points
//save to local storage 
//display function for both? or two separate ones? does it depend on the parameter?
// pass in function for dynamically creating search history buttons
function formSubmitHandler(event) {
    event.preventDefault()
    //declare input, val, trim
    let cityname = cityInputEl.value.trim()
    if (cityname) {
        // not fetching anything
        // use current to get lat and lon
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`
        fetch(weatherURL).then((response) => {
            // why isnt it console.logging?**?
            console.log(response)
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data)
                    displayWeather(data)
                    displayForecast(data)
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
        const cityPast = cityInputEl.value
        if (!history.includes(cityPast)) {
            //push it into history array
            history.push(cityPast)
            //set items with key value and stringify history array
            // figure out why its repopulating ****
            localStorage.setItem("cities", JSON.stringify(history))
            showHistory(history)
        }

    }
    else { // edge case for no input
        alert("You must input a city location to retrieve results.")
    }
}

// display jumbo content function
function displayWeather(data) {
    // do all the current conditions stuff
    let date = new Date(data.dt * 1000)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let weatherPic = document.createElement('img')
    // innerhtml icon conditions
    weatherPic.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
    weatherPic.setAttribute("alt", data.weather[0].description)
    weatherCityHeaderEl.textContent = `${cityInputEl.value} ${month}/${day}/${year} ${weatherPic}`
    temperatureEl.textContent = `Temperature: ${k2f(data.main.temp)}°F`
    wsEl.textContent = `Wind Speed: ${data.wind.speed} MPH`
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`

}
// display UVI and forecast
function displayForecast(data) {
    let lat = data.coord.lat
    let lon = data.coord.lon
    // use lat and lon to get uvi and forecast data
    let uviforecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`
    fetch(uviforecastURL).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                let uvi = document.createElement("span")
                uvEl.append(uvi)
                uvEl.textContent = `UV Index: `
                uvi.textContent = parseInt(data.current.uvi)
                if (uvi < 3) {
                    uvEl.setAttribute("class", "success")
                }
                else if (3 < uvi < 9) {
                    uvEl.setAttribute("class", "warning")
                }

                else {
                    uvEl.setAttribute("class", "danger")
                }

                
            })
        }
    })
    // make elemtns and append to divs of five-container
    //select forecats
    //make for loop
    //0-4 of array

    // get 5-day forecsat with onecall
    //     let forecastURL = `&appid=${apikey}`
    //     fetch(forecastURL).then(function (response) {
    //         console.log(response)
    //         if (response.ok) {
    //             response.json().then(function (data) {
    //                 displayForecast(data)
    //             })
    //         }
    //     })
}


//use for loop to create elements
function showHistory(history) {
    for (let i = 0; i < history.length; i++) {
        let historyBtn = document.createElement("button")
        historyBtn.setAttribute("class", "btn-secondary w-80")
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
    history = []
    showHistory(history)
}

// search button add event listener
// form submit function launch
searchBtnEl.addEventListener("click", formSubmitHandler)
// clear history button clear function
clearBtnEl.addEventListener("click", clearHistory)






