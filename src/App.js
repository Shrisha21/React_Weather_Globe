import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import './earth.css';
import moment from 'moment';

export default class Ap extends Component {
  
  constructor(props){
    super(props);
    this.state={
        lat: undefined,
        lon: undefined,
        city: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        icon: undefined,
        sunrise: undefined,
        sunset: undefined,
        errorMessage: undefined,
    }
  }
  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  getWeather = async (latitude, longitude) => {
    const API_KEY = "579bf7d288c2dafdc9212c23a3ece83a";
    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    
    this.setState({
      lat: latitude,
      lon: longitude,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      icon: data.weather[0].icon,
      sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
      sunset: moment.unix(data.sys.sunset).format("hh:mm a"),
    })
  }
  componentDidMount() {
    this.getPosition()
    .then((position) => {
       this.getWeather(position.coords.latitude,     
       position.coords.longitude)
     })
     .catch((err) => console.log(err.message));

     this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
 }
 componentWillUnmount() {
  clearInterval(this.timerID);
}

  render() {
    const {temperatureC, city, temperatureF,  sunrise, sunset}=this.state;
    return (
      <div >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Weather Application
        
        <div id='earth'>
        </div>
    <div align='center'>City: {city}</div>
    <div align='center'>Temperature in &deg;C:{temperatureC}</div>
    <div align='center'>Temperature in &deg;F: {temperatureF}</div>
    
    <div align='center'>Sunrise Time: {sunrise}</div>
    <div align='center'>Sunset Time: {sunset}</div>
      </header>
    </div>
    )
  }
}


