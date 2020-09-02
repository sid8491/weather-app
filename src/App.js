import React, { useState } from 'react';

const api = {
  key: 'a13a52cdab36dde7b0159dda6a5e3c67',
  base: 'https://api.openweathermap.org/data/2.5/'

}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
      })
    }
  }

  const dateBuilder = (d) => {
    let daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = daylist[d.getDay()]
    let date = String(d.getDate()).padStart(2, '0')
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month}, ${year}`
  }

  const appClass = () => {
    let className = 'app'
    if (typeof weather.main === 'undefined') {
      className = 'app'
    } else {
      if (weather.main.temp < 10) {
        className = 'app cold'
      } else if(weather.main.temp < 30) {
        className = 'app spring'
      } else {
        className = 'app hot'
      }
      if (weather.weather[0].main === 'Thunderstorm') {
        className = 'app lightning'
      } else if (weather.weather[0].main === 'Clouds') {
        className = 'app cloudy'
      }
    }
    return className
  }

  return (
    <div className={appClass()}>
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != 'undefined') ?  (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
            {Math.round(weather.main.temp)}° C
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
