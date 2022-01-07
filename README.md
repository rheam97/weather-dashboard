# Weather-Dashboard
# Table of Contents
* [Project Description](#project-description)
* [How I Made It](#how-i-made-it)
* [Usage](#Usage)
* [URL](#URL)

<a name= "projectdescription"></a>
## Project Description

A weather dashboard that will run in the browser and feature dynamically updated HTML and CSS (made with Bootstrap) using vanilla JS.

Uses the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Uses localStorage to store any persistent data.


### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
<a name="howimadeit"></a>
## How I Made It

I always start by pseudocoding the main functions that I need to begin building the app. I started coding by creating the HTML elements and adding some styling to make the look clean so that I can envision how the app needs to function given the necessary elemtns and their functions. 
I then created DOM references in the js. I created event listeners for the buttons I wanted and started with the formSubmitHandler function. Once the event is launched, the function iterates through conditions to see whether or not a valid cityname was input. 

If it was, the name is sent to the API call for the jumbotron display which is used to fetch a secondary API for the UVI and the forecast display and the item is set to local storage and displays a a button in search history. The elements in those and/or their contents are dynamically generated. The app has three error alerts: for blank searches, for typos, and for network errors. This is so the app doesnt crash. The forecast array iterates through the daily array of the data object starting with the next day. The containers refresh with every search because the innerHTML is initially set to ="". 

The search history buttons can be used to fetch old searches using the textContent of the button. The clear button clears local storage and the search history DOM. Any search hsitory that isn't cleared persists on refresh becasue the rendering function for the buttons is called at the end. It is able to do this also because the history array is set as a global variable.

<a name="usage"></a>
## Usage

Here is how the app looks and functions: 
note: if the timezone is 3 hours behind, the forecast will begin with what looks like the present day (to those in a later timezone) if late at night, not sure how to address this yet

![app function](weatherdashboard.gif)


<a name="URL"></a>
## URL

* The URL of the deployed application: 
* The URL of the repo: 







