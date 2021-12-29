//DOM references
let cityInputEl = document.getElementById("city-name")
let searchBtnEl = document.querySelector("search")
let clearBtnEl = document.querySelector("clear")
let historyContEl = document.getElementById("history-buttons")
let weatherDisplayEl = document.getElementById("main-container")
let weatherCityHeaderEl =document.getElementById("city-today")
let temperatureEl =document.getElementById("temperature")
let humidityEl =document.getElementById("humidity")
let wsEl =document.getElementById("windspeed")
let uvEl =document.getElementById("uv-index")
let fiveDayEl =document.getElementById("five-container")

//global variables
let history = "" 
// allow page to persist

var historyBtn =""
// api keys

function formSubmitHandler() {
    //declare input, val, trim
    //edge case 
    //else display weather and forecast
    // OR else fetch weather and forcast and then display?
    //set item to storage
    //define history
    // for loop
    //get item
    // define history btn
    //make search history button
    // search history button add event listener for two functions?
    //appendchild to hsitory container


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
function displayWeather() {

}
// fetch top container
    //fetch api with queries using city name and state?
    // if response ok then display repo

function displayforecast()
  // make elemtns and append to divs of five-container
  //select forecats
  //make for loop
}
//fetch five day forecast 
    // same thing as first fetch
      // if response ok then display repo



function clearHistory() {
// clear local storage
// 
}

// search button add event listener
    // form submit function launch
searchBtnEl.addEventListener("submit", formSubmitHandler)
// clear history button clear function
clearBtnEl.addEventListener("click", clearHistory)


   



