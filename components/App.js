import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard.js';

function App(props) {
  const [isLoaded, setIsLoaded] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Chicago");
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);

  // get weather data
  useEffect(() => {
    let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=" + props.apiKey;
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        if (result.cod !== "200") setError(result.cod);
        else {
          setError(false);
          let data = [];
          let currDate = result.list[0].dt_txt;
          let dayObj = {};
          for (let i = 0; i < result.list.length; i++) {
            let date = new Date(result.list[i].dt_txt);
            if (date.getDate() != currDate) {
              // date is different so push previous dayObj to data and empty dayObj
              if (dayObj.date) data.push(dayObj);
              dayObj = { temps: [], weather: [] };
              currDate = date.getDate();
              dayObj.date = date;
            }
            // filter out times between midnight and 9am
            if (date.getHours() >= 9) {
              dayObj.temps.push(result.list[i].main.temp);
              dayObj.temps.push(result.list[i].main.temp_min);
              dayObj.weather.push(result.list[i].weather[0]);
            }
          }
          setWeatherData(data);
          setIsLoaded(true);
        }
      },
        (error) => {
          console.error(error);
        });
  }, [location]);

  function handleSubmit(e) {
    e.preventDefault();
    setLocation(inputText);
    setInputText("");
  }

  function handleChange(e) {
    setInputText(e.target.value);
  }

  // render
  return (
    <div id="container">
      {isLoaded ?
        <div id="forecast">
          <h1>{location} Forecast</h1>
          {error ? "ERROR: " + error :
            weatherData.map(x => <WeatherCard key={x.date} data={x} />)
          }
        </div> :
        "loading..."}
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={handleChange}></input>
          <input type="submit" value="Set Location"></input>
        </form>
    </div>
  )
}

export default App;
