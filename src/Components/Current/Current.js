import React from 'react';
import './Current.css'

export default function Current(props) {
    return (
        <div className="current">
            <p>Temperature: {props.current.main.temp} °F</p>
            <p>Description: {props.current.weather[0].description}</p>
            <p>Humidity: {props.current.main.humidity}%</p>
            <p>Wind Speed: {props.current.wind.speed} mph</p>
        </div>
    )
}