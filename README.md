# weather-dashboard
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

html
// make input form for city
//button to click submit
// container for search history use localstorage
//search history items are clickable and retrieve same data 
// container to show location name, date, weather icon, temp, wind, humidity, uv
//uv index has icon to show whether or not its favorable: 3 conditions
// container below to show 5 day forecast of that city with alll of the same aspects as 
//third container
