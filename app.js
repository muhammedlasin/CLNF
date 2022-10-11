let weather={
    fetchWeather: function(city){
        fetch(
            "http://api.weatherapi.com/v1/current.json?key=4f860f591a0d46e2b57120738220610&q="
            + city
            + "&aqi=no"
        )
            .then((response)=>response.json())
            .then((data)=>this.displayWeather(data));
    },
    displayWeather:function(data){
        const{name,region,localtime} = data.location;
        const{temp_c,feelslike_c,wind_kph,pressure_in,precip_mm,humidity}=data.current;
        const{text,icon}=data.current.condition;
        console.log(name,region,localtime,temp_c,text,icon,feelslike_c,wind_kph,precip_mm,humidity);
        document.querySelector(".weathercity").innerText=name;
        document.querySelector(".tempc").innerText= temp_c + "°C";
        document.querySelector(".icon").src= icon;
        document.querySelector(".feelslike").innerText="Feels like " +feelslike_c + "°C";
        document.querySelector(".description").innerText= text;
        document.querySelector(".pressure").innerText="Pressure: " +pressure_in + "%";
        document.querySelector(".humidity").innerText="Humidity: " +humidity + "%";
        document.querySelector(".precip").innerText="Precip: " +precip_mm;
        document.querySelector(".wind").innerText="Wind Speed: " +wind_kph + "km/h";
    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    },
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Kochi");
