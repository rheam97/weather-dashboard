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
const apikey = "fbce9e166f000ebb199687079f74a400"

function formSubmitHandler(event) {
    event.preventDefault()
    //declare input, value, trim
    let cityname = cityInputEl.value.trim()
    if (cityname) {
        // use current to get lat and lon
        getWeather(cityname)

        // so that cityname is not repeated in search history 
        if (!history.includes(cityname)) {
            //push it into history array
            history.push(cityname)
            //set items with key value and stringify history array
            localStorage.setItem("cities", JSON.stringify(history))
            showHistory(history)

        }
        else {
            showHistory(history)
        }

    }
    else { // edge case for no input
        alert("You must input a city location to retrieve results.")
    }

}

function getWeather(city) {
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    fetch(weatherURL).then((response) => {
        console.log(response)
        if (response.ok) {
            response.json().then((data) => {
                displayWeather(data)
                let lat = data.coord.lat
                let lon = data.coord.lon
                // use lat and lon to get uvi and forecast data
                let uviforecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&cnt=1`
                fetch(uviforecastURL).then((response2) => {
                    console.log(response2)
                    if (response2.ok) {
                        response2.json().then((data2) => {

                            let uvindex = document.createElement("span")

                            uvEl.textContent = `UV Index: `
                            uvEl.appendChild(uvindex)
                            uvindex.textContent = data2.current.uvi
                            if (parseInt(uvindex.textContent) < 3) {
                                uvindex.setAttribute("class", "badge badge-success")
                            }
                            else if (3 < parseInt(uvindex.textContent) < 9) {
                                uvindex.setAttribute("class", "badge badge-warning")
                            }

                            else {
                                uvindex.setAttribute("class", "badge badge-danger")
                            }
                            displayForecast(data2)
                        })
                    }
                })
            })
        }
        else { // typo error
            alert("Error: City not found.")
        }

    })// network error
        .catch(function (error) {
            console.log(error)
            alert("Unable to connect to OpenWeather.")
        })
}
// display jumbo content function
function displayWeather(data) {
    // make the elemtns with current api data
    let date = new Date(data.dt * 1000)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    weatherPic = document.createElement("img")
    let weatherPicFetch = data.weather[0].icon
    // innerhtml icon conditions
    weatherPic.setAttribute("src", `https://openweathermap.org/img/wn/${weatherPicFetch}@2x.png`)
    weatherPic.setAttribute("alt", data.weather[0].description)
    weatherCityHeaderEl.textContent = `${data.name} ${month}/${day}/${year}`
    weatherCityHeaderEl.appendChild(weatherPic)
    temperatureEl.textContent = `Temperature: ${k2f(data.main.temp)}°F`
    wsEl.textContent = `Wind Speed: ${data.wind.speed} MPH`
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`
}


//select forecast cards
//make for loop
function displayForecast(data2) {
    fiveDayEl.classList.remove("d-none")
    let forecastEls = document.querySelectorAll(".forecast")
    for (let i = 0; i < forecastEls.length; i++) {
        forecastEls[i].innerHTML = ""
        // make and append elements to forecast cards
        let forecastheaders = document.createElement("p")
        let forecastIcon = document.createElement("img")
        let forecastTemp = document.createElement("p")
        let forecastWind = document.createElement("p")
        let forecastHum = document.createElement("p")
        //iterate through 1-5 of data.daily array in onecall to get next day onwards
        let forecastDate = new Date(data2.daily[i + 1].dt * 1000)
        let forecastDays = forecastDate.getDate()
        let forecastMonth = forecastDate.getMonth() + 1
        let forecastYear = forecastDate.getFullYear()

        forecastheaders.textContent = `${forecastMonth}/${forecastDays}/${forecastYear}`

        let forecastPic = data2.daily[i + 1].weather[0].icon
        forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${forecastPic}@2x.png`)
        forecastIcon.setAttribute("alt", data2.daily[i + 1].weather[0].description)

        forecastTemp.textContent = `Temp: ${k2f(data2.daily[i + 1].temp.day)}°F`

        forecastWind.textContent = `Wind: ${data2.daily[i + 1].wind_speed} MPH`

        forecastHum.textContent = `Humidity: ${data2.daily[i + 1].humidity}%`
        forecastEls[i].appendChild(forecastheaders)
        forecastEls[i].appendChild(forecastIcon)
        forecastEls[i].appendChild(forecastTemp)
        forecastEls[i].appendChild(forecastWind)
        forecastEls[i].appendChild(forecastHum)
    }
}

//use for loop to create elements
function showHistory(history) {
    historyContEl.innerHTML = ""
    for (let i = 0; i < history.length; i++) {
        let historyBtn = document.createElement("button")
        historyBtn.setAttribute("class", "btn btn-success mb-1 w-100")
        historyBtn.textContent = history[i]
        historyBtn.addEventListener("click", function () {
            getWeather(historyBtn.textContent)
        })
        historyContEl.appendChild(historyBtn)
    }
}

function clearHistory() {
    //clear local storage
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

// get search history to persist on refresh
showHistory(history)