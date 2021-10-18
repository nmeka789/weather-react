
import React, { useState } from "react";
import styles from "./weather.module.css";
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const api = {
  key: "858f15fed9292cbe25c341a754c55e45",
  base: "https://api.openweathermap.org/data/2.5/"
}

export default function Weather() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log("result", result);
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (

    <div className={styles.app}>
      <main>
        <div className={styles.weather_search_box}>
          <input
            type="text"
            className={styles.weather_search_bar}
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className={styles.weather_location_box}>
              <div className={styles.location}>{weather?.name},{weather?.sys?.country}
              </div>
              <div className={styles.date}>{dateBuilder(new Date())}</div>
            </div>
            <div className={styles.weather_box}>
              <div className={styles.temp}>
                {Math.round(weather?.main?.temp)}°c <br />
                lang-{Math.round(weather?.coord?.lon)} <br />
                lat-{Math.round(weather?.coord?.lat)}

              </div>
              <div className={styles.weather}><FontAwesomeIcon icon={faCloud} />
                {weather?.weather[0]?.main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}