//current issues:
// not pulling up uvi
// not displaying main icon
// not displaying forecast dates properly
//forecast divs are wobbly
// not repopulating history properly when cleared
// not getting and setting properly
// where to put clear contents
// search history buttons dont work with forumsubmithandler because of preventdefault




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

// form submit function
//pass in fetch function for queries for location name, date, weather icon, temp, wind, humidity, uv
// pass in function for five day forecast with same data points
//save to local storage 
//display function for both? or two separate ones? does it depend on the parameter?
// pass in function for dynamically creating search history buttons

function formSubmitHandler(variable) {
    //event.preventDefault()
    //declare input, val, trim
    let cityname = cityInputEl.value.trim()
    if (cityname) {
        // use current to get lat and lon
        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`
        fetch(weatherURL).then((response) => {
            console.log(response)
            if (response.ok) {
                response.json().then((data) => {
                    displayWeather(data)
                    let lat = data.coord.lat
                    let lon = data.coord.lon
                    // use lat and lon to get uvi and forecast data
                    let uviforecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&cnt=1`
                    fetch(uviforecastURL).then((response) => {
                        console.log(response)
                        if (response.ok) {
                            response.json().then((data2) => {
                                let uvindex = document.createElement("span")
                                uvEl.append(uvindex)
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
            showHistory()
        }

    }
    else { // edge case for no input
        alert("You must input a city location to retrieve results.")
    }
     // clear contents of container
     cityInputEl.value = ""
}

// display jumbo content function
function displayWeather(data) {
    // do all the current conditions stuff
    let date = new Date(data.dt * 1000)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let weatherPic = document.createElement('img')
    let weatherPicFetch = data.weather[0].icon
    // innerhtml icon conditions
    weatherPic.setAttribute("src", `https://openweathermap.org/img/wn/${weatherPicFetch}@2x.png`)
    weatherPic.setAttribute("alt", data.weather[0].description)
    weatherCityHeaderEl.textContent = `${data.name} ${month}/${day}/${year} ${weatherPic}`
    temperatureEl.textContent = `Temperature: ${k2f(data.main.temp)}°F`
    wsEl.textContent = `Wind Speed: ${data.wind.speed} MPH`
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`

}
// display UVI and forecast
function displayForecast(data) {
    fiveDayEl.classList.remove("d-none")
    let forecastEls = document.querySelectorAll(".forecast")
    for (let i = 0; i < forecastEls.length; i++) {
        let forecastheaders = document.createElement("p")
        let forecastIcon = document.createElement("img")
        let forecastTemp = document.createElement("p")
        let forecastWind = document.createElement("p")
        let forecastHum = document.createElement("p")
        //for (let l = 0; l < forecastEls[i].length; l++) {
            let forecastDate = new Date(data.daily[i].dt * 1000)
            let forecastDays = forecastDate.getDay()
            let forecastMonth = forecastDate.getMonth()
            let forecastYear = forecastDate.getFullYear()
           
            forecastheaders.textContent = `${forecastMonth}/${forecastDays}/${forecastYear}`
           
            let forecastPic = data.daily[i].weather[0].icon
            forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${forecastPic}@2x.png`)
            forecastIcon.setAttribute("alt", data.daily[i].weather[0].description)
            
            forecastTemp.textContent= `Temp: ${k2f(data.daily[i].temp.day)}°F`
           
            forecastWind.textContent = `Wind: ${data.daily[i].wind_speed} MPH`
           
            forecastHum.textContent= `Humidity: ${data.daily[i].humidity}%`
            forecastEls[i].appendChild(forecastheaders)
            forecastEls[i].appendChild(forecastIcon)
            forecastEls[i].appendChild(forecastTemp)
            forecastEls[i].appendChild(forecastWind)
            forecastEls[i].appendChild(forecastHum)
       // }
    }

    // })
    //  }
    //  })
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
            //// ****doesn't work because of prevent default
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

// get search history to persist on refresh
showHistory(history)





