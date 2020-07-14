import React from 'react';
import styledComp from 'styled-components';
import {GiPositionMarker,GiThermometerScale,GiThermometerCold} from 'react-icons/gi'
import {TiCalendar, TiWeatherCloudy} from 'react-icons/ti'
import {FiWind,FiThermometer} from 'react-icons/fi'
import {FaThermometerFull,FaThermometerEmpty} from 'react-icons/fa'


import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')

const CurrentLocation = data_weather => {
  const current = data_weather.data
  return <CurrentLayout>
      <div className="current-container ">
        <div className="item-list">
          <div className="current-temp">
            <GiPositionMarker/> Ciudad: {current ? current.city.name_city + ', ' + current.city.shortcut_country : '----'}
          </div>
          <div className='current-temp'>
            <FiThermometer/> Temperatura: {current ? current.temperature_info.temp : 0} °C
          </div>
          <div className='current-temp'>
            <GiThermometerCold/> Sensación: {current ? current.temperature_info.temp_thermal : 0} °C
          </div>
          <div className='date-div'>
            <TiCalendar/> Día: {moment().format('dddd DD MMMM YYYY')} 
          </div>
          
        </div>
          
      </div>
      <div className="current-container ">
        <div className='current-temp'>
          <img src={`http://openweathermap.org/img/wn/${current ? current.icon_data : '01n'}@2x.png`} alt='Icono del clima' />
          <div ><TiWeatherCloudy /> Estado: {current ? current.description : '-'}</div>
        </div>
      </div>
      <div className="current-container ">
        <div className='item-list'>
          <div><FaThermometerFull />Máxima: {current ? current.temperature_info.temp_max : 0}°C</div>
          <div><FaThermometerEmpty />Mínima: {current ? current.temperature_info.temp_min : 0}°C</div>
          <div><GiThermometerScale />Humedad: {current ? current.temperature_info.humidity : 0}%</div>
          <div><FiWind />Vel. del viento: {current ? current.wind_speed : 0} Km/h</div>
        </div>
      </div>
  </CurrentLayout>
}

const CurrentLayout = styledComp.div`
  display:flex;
  align-items: center;
  flex-wrap:wrap;
  justify-content: center;
  margin: auto;
  witdh: 90%
  height: 15rem;
  .graph-layout{
    min-width:50%;
  }

  .current-container{
    color:hsl(207, 79%, 42%);;
    font-weight:bold;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width: 33%; 
    height:12rem;
  }

  .current-temp{
    font-size: 1.5rem;
  }

  .date-div{
    font-size: 1.5rem;
  }

  .item-list{
    min-width: 100%;
    height:30rem;
    font-size: 1.5rem;
    display: inline-block;
    flex-direction: column;
    padding: 2rem;
    margin: auto 10px;
    justify-content: space-around;
    div{
      display:flex;
      align-items:center;
    }
    svg{
      margin-right:1rem;
    }
  }
    
  img {
    width: 120px;
    height: 120px;
    vertical-align: middle;
    margin: auto;
    position: relative;
    align-content: unset;
    display: block;
  }

  .caption-container{
    text-transform:capitalize;
  }

  @media (max-width: 1000px) {
    .graph-layout{
      min-width:100%;
    }
  }

  @media (min-width: 1001px) {
    .graph-layout{
      width:50%;
    }
  }
`;

export default CurrentLocation