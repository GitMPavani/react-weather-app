import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';

function Home () {
  const [data, setData] = useState({
    celcius: 28,
    name: 'Colombo',
    humidity: 20,
    speed: 2,
    image: '/Images/clouds.png'
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');
 
  const handleClick = () => {
    if(name !== ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e990d730142f1741391b7b5d71bad39c&units=metric`;
    axios.get(apiUrl)
    .then(res => {
      let imagePath = '';
      if (res.data.weather[0].main == "Clouds") {
        imagePath = "/Images/clouds.png";
      } else if (res.data.weather[0].main == "Clear") {
        imagePath = "/Images/clear.png";
      } else if (res.data.weather[0].main == "Rain") {
        imagePath = "/Images/rain.png";
      } else if (res.data.weather[0].main == "Drizzle") {
        imagePath = "/Images/drizzle.png";
      } else if (res.data.weather[0].main == "Mist") {
        imagePath = "/Images/mist.png";
      } else {
        imagePath = "/Images/clouds.png";
      }
      console.log(res.data);
      setData({...data, celcius: res.data.main.temp, name: res.data.name, 
        humidity: res.data.main.humidity, speed: res.data.wind.speed,
      image: imagePath})
      setError('');
    })
    .catch(err => {
      if(err.response.status == 404){
        setError("Invalid City Name")
      } else{
        setError('');
      }
      console.log(err)
    }); 
    }
  }

  const handleDownload = () => {
    // Replace 'YOUR_PDF_URL' with the actual URL of the external PDF
    const pdfUrl = '/Images/weather1.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'weather_report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='weather-container'>
        <div className='weather'>
            <div className='weather-search'>
                <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
                <button>
                    <img src= "/Images/search.png" onClick={handleClick} alt=''/>               
                </button>
            </div>
            <div className='weather-error'>
              <p>{error}</p>
            </div>
            <div className='weather-winfo'>
            <img src= {data.image} alt=''/> 
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className='weather-details'>
              <div className='humidity'>
              <img src= "/Images/huminidy.png" alt=''/>
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
              </div>
              <div className='wind'>
              <img src= "/Images/wind.png" alt=''/>
              <div>
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
              </div>
            </div>
            <button className='download-button' onClick={handleDownload}>
            Download Weather Report for Agriculture
          </button>

            </div>
        </div>
      
    </div>
  )
}

export default Home;
