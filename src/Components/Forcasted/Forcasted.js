import React from "react";
import './Forcasted.css'

export default function Forcasted(props) {
  return (
    <>
      {props.forcasted.map((item, key) => (
        <div className="forcasted"key={item.dt}>
            <h3>Date: {item.dt_txt} UTC</h3>
            <p>Temperature: {item.main.temp} °F</p>
            <p>Description: {item.weather[0].description}</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Wind Speed: {item.wind.speed} mph</p>
        </div>
        ))}
    </>
  );
}
