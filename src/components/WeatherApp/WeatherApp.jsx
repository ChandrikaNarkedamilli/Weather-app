import React , {useState , useEffect} from 'react'
import './WeatherApp.css'
import axios from 'axios'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'




function WeatherApp() {
  const [data, setData] = useState({
    celsius : 10,
    city : 'London',
    humidity : 10,
    windspeed : 2,
    image: cloud_icon
  })
  const [city, setCity] = useState('')
  const [error, setError] = useState('')


  const handleClick =()=> {
    if(city!== ''){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf79dd0a31fa80ddd4b2cb2ebd18b42c&units=metric`
      axios
      .get(apiUrl)
      .then( res => {
        let imagePath = '';
        if(res.data.weather[0].main == "Clouds") {
          imagePath = cloud_icon
        }else if(res.data.weather[0].main == 'Clear'){
          imagePath = clear_icon
        }else if(res.data.weather[0].main == 'Rain'){
          imagePath = rain_icon
        }else if(res.data.weather[0].main == 'Drizzle'){
          imagePath = drizzle_icon
        }else if(res.data.weather[0].main == 'Mist'){
          imagePath = snow_icon
        }else {
          imagePath = cloud_icon
        }
        console.log(res.data)
          setData({...data, celsius : res.data.main.temp, city : res.data.name ,
          humidity : res.data.main.humidity , windspeed : res.data.wind.speed, image : imagePath})
          setError('')
        })
      .catch(err => {
        if(err.response.status == 404){
          setError('no results found')
        }else {
          setError('')
        }
        console.log(err)
      })
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput'  placeholder='Search city' onChange={e => setCity(e.target.value)}/>
        <div className='search-icon'>
          <img src={search_icon} onClick={handleClick} alt=''/>
        </div>
      </div>  
      <div className="error">
          <p>{error}</p>
        </div>
      <div className='weather-image'>
        <img src={data.image} alt =''/>
      </div> 
      <div className="weather-temp">{Math.round(data.celsius)}°C</div>
      <div className="weather-location">{data.city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt='' className='icon'/>
          <div className="data">
            <div className="humidity-percent">{Math.round(data.humidity)}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt='' className='icon'/>
          <div className="data">
            <div className="humidity-percent">{Math.round(data.windspeed)} kmph</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
