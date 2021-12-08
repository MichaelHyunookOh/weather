import React, { useEffect, useState } from "react";
import Forcasted from "../../Components/Forcasted/Forcasted";
import config from '../../config.js'
import Current from '../../Components/Current/Current'
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCurrentWeather,
  fetchForcastedWeather,
  selectCurrentWeather,
  selectForcastedWeather,
  setCity,
  selectCity,
  selectError,
} from "./weatherSlice";

export function Weather() {
  const currentWeather = useSelector(selectCurrentWeather);
  const forcastedWeather = useSelector(selectForcastedWeather);
  const city = useSelector(selectCity);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          fetchCurrentWeather(
            `https://corsanywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${config.API_KEY}&units=imperial`
          )
        );
        dispatch(
          fetchForcastedWeather(
            `https://corsanywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=3&appid=${config.API_KEY}&units=imperial`
          )
        );
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchCurrentWeather(
        `https://corsanywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}&units=imperial`
      )
    );
    dispatch(
      fetchForcastedWeather(
        `https://corsanywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${config.API_KEY}&units=imperial`
      )
    );
  };

  const renderCurrentWeather = () => {
    return (
      <div>
      <h1>City: {currentWeather.name}</h1>
      <section className="currentContainer">
      <h2>Current Weather</h2>
        <Current current={currentWeather}/>
      </section>

      <section className="forcastedContainer">
      <h2>Forcasted Weather</h2>
        <Forcasted forcasted={forcastedWeather.list}/>
      </section>
        
        
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => dispatch(setCity(e.target.value))}
          placeholder="Search City"
          required
        />
        <button type="submit">search</button>
      </form>
      <div>{error ? error : null}</div>
      <div>
        {currentWeather.length !== 0 && forcastedWeather.length !== 0
          ? renderCurrentWeather()
          : null}
      </div>
    </div>
  );
}
