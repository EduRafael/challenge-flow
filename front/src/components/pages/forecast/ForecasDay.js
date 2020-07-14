import React from 'react';
import {FiWind} from 'react-icons/fi'
import {FaThermometerFull,FaThermometerEmpty} from 'react-icons/fa'
import {GiThermometerCold,GiThermometerScale} from 'react-icons/gi'
import {TiCalendar, TiWeatherCloudy} from 'react-icons/ti'


import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')

const Day = data => {
    const { day, temperature_data} = data
    console.log({temperature_data});
    return (
        <div>            
            <div className="current-container ">
                <div className="current-date">
                   <TiCalendar/> {data ? moment(day).format('dddd DD MMMM YYYY') : '--/--/--'}
                </div>
                <div className="current-date">
                    <div className="info-list">
                        <img className='current-temp' src={`http://openweathermap.org/img/wn/${data ? temperature_data[0].icon_data : '01n'}@2x.png`} alt='Icono del clima' />
                        <div className=''><TiWeatherCloudy />  Estado: {data ? temperature_data[0].description : '-'}</div>
                    </div>
                    <div className='info-list-temp'>
                        <div><FaThermometerFull/>Máxima: {data ? temperature_data[0].temperature_info.temp_max : 0}°C</div>
                        <div><FaThermometerEmpty/>  Mínima: {data ? temperature_data[0].temperature_info.temp_min : 0}°C</div>
                        <div><GiThermometerCold/>  Sesación: {data ? temperature_data[0].temperature_info.temp_thermal : 0}°C</div>
                        <div><GiThermometerScale/>  Humedad: {data ? temperature_data[0].temperature_info.humidity : 0}%</div>
                        <div><FiWind/>  Viento: {data ? temperature_data[0].wind_speed : 0} Km/h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Day;