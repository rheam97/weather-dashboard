//current issues:
// not pulling up uvi
// giving input edge case when input is input
// not repopulating history properly when cleared, giving console error for history.length when ls is empty
// not getting and setting properly
// where to put clear contents(especially for forecast display)



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
//document.onload(history)
// ****returning error, maybe make it not global 
// allow page to persist
// api key
const apikey = "fbce9e166f000ebb199687079f74a400"



function formSubmitHandler(event) {
    event.preventDefault()
    //declare input, val, trim
    let cityname = cityInputEl.value.trim()
    if (cityname) {
        // use current to get lat and lon
        getWeather(cityname)
        // set local storage variable
        // perhaps put this into show history and just call it from here 

        if (!history.includes(cityname)) {
            //push it into history array
            history.push(cityname)
            //set items with key value and stringify history array

            localStorage.setItem("cities", JSON.stringify(history))
             // figure out why its not repopulating **** and why it gives console error for length when ls
             //is cleared
             showHistory()
            
        }
        showHistory()
    }
    else { // edge case for no input why does this pop up when i input??****
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
                            uvEl.appendChild(uvindex)
                            uvEl.textContent = `UV Index: `
                            uvindex.textContent = `${data2.current.uvi}`
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
        else {
            alert("Error: City not found.")
        }

    })
        .catch(function (error) {
            console.log(error)
            alert("Unable to connect to OpenWeather.")
        })
}
// display jumbo content function
function displayWeather(data) {

    // do all the current conditions stuff
    let date = new Date(data.dt * 1000)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let weatherPic = document.createElement("img")
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

// make elemtns and append to divs of five-container
//select forecats
//make for loop
//0-4 of array
function displayForecast(data2) {
    fiveDayEl.classList.remove("d-none")
    let forecastEls = document.querySelectorAll(".forecast")
    for (let i = 0; i < forecastEls.length; i++) {
        let forecastheaders = document.createElement("p")
        let forecastIcon = document.createElement("img")
        let forecastTemp = document.createElement("p")
        let forecastWind = document.createElement("p")
        let forecastHum = document.createElement("p")

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
    for (let i = 0; i < history.length; i++) {
        let historyBtn = document.createElement("button")
        historyBtn.classList.add("btn-secondary m-3")
        historyBtn.textContent = history[i]
        historyBtn.addEventListener("click", function () {
            getWeather(historyBtn.textContent)
            // clear contents of container*** not working 
            cityInputEl.value = ""
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

// get search history to persist on refresh
showHistory(history)