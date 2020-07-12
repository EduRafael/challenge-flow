import React from 'react';
import {WiThermometerExterior, WiUmbrella, WiThermometerInternal, WiStrongWind, WiHumidity } from 'react-icons/wi'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')

const Day = data => {
    const { day, temperature_data} = data
    return (
        <div>            
            <div className="current-container ">
                <div className="current-date">
                    {data ? moment(day).format('dddd DD MMMM YYYY') : '--/--/--'}
                </div>
                <div className="current-date">
                    <div className="info-list">
                        <img className='current-temp' src={`http://openweathermap.org/img/wn/${data ? temperature_data[0].icon_data : '01n'}@2x.png`} alt='Icono del clima' />
                        <div className=''><WiUmbrella />  Estado: {data ? temperature_data[0].description : '-'}</div>
                    </div>
                    <div className='info-list'>
                        <div><WiThermometerExterior  />Máxima: {data ? temperature_data[0].temperature_info.temp_max : 0}°C</div>
                        <div><WiThermometerInternal  />  Mínima: {data ? temperature_data[0].temperature_info.temp_min : 0}°C</div>
                        <div><WiHumidity  />  Humedad: {data ? temperature_data[0].temperature_info.humidity : 0}%</div>
                        <div><WiStrongWind  />  Velocidad del viento: {data ? temperature_data[0].wind_speed : 0} Km/h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Day;