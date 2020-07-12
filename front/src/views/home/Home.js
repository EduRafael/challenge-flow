import React, { useState, useEffect }  from 'react'
import {getCurrentData, getForecastData} from '../../request/request'
import './Home.css'
import Card from './../../components/commons/card/Card'
import Dropdown from './../../components/commons/dropdown/Dropdown'
import { useMediaLayout } from 'use-media';
import CurrentLocation from './../../components/pages/current/CurrentWeather'
import styled from 'styled-components';
import Carousel from './../../components/pages/forecast/ForecastWeather'

const Home = () => {
    const [locationWeather, setLocation]  = useState(null);
    const [isLoading, setLoading]  = useState(false);
    const [city, setCitySelect]          = useState('Buenos Aires, AR');
    const isWide = useMediaLayout({minWidth : 1000});

    const select_city = city =>{
        setCitySelect(city);
    }
    
    useEffect(()=>{ 
        _getDataLocation()
    }, [city])

    const _getDataLocation = async () => {
        setLoading(true)
        const data_weather = {
            current  : (await getCurrentData(city)).result,
            forecast : (await getForecastData(city)).result
        }
        setLoading(false)
        setLocation(data_weather)
    };

    return (
        <HomeLayout>
            <Card >
                <div className="header">
                    <Card className="drop-container" isLoading={isLoading}>
                        <div className="current-date">
                          Seleccione una ubicación:
                        </div>
                        <Dropdown 
                            initial_value="Buenos Aires, Ar"
                            next_value = { value => select_city(value)}
                            items={[
                                {label: "Tokio", value : "Tokio, JP"},
                                {label: "Caracas", value : "Caracas, VE"},
                                {label: "Monterrey", value : "Monterrey, MX"},
                                {label: "Londres", value : "London, US"},
                                {label: "Toronto", value : "Toronto, CA"},
                                {label: "Santiado de Chile", value : "Santiago, CL"},
                                {label: "Buenos Aires", value : "Buenos Aires, AR"}
                            ]}
                        />
                    </Card>
                </div>
                <Card className="current-styles" isLoading={isLoading}>
                    <div className="current-date">
                        Estado Actual
                    </div>
                    <CurrentLocation  data={!!locationWeather && locationWeather.current}/>
                    
                </Card>
                <Card className="current-styles" isLoading={isLoading}> 
                    <div className="current-date">
                        Pronóstico para los próximos 5 días
                    </div>
                    <Carousel data={!!locationWeather && locationWeather.forecast}/>
                    
                </Card>                
            </Card>
        </HomeLayout>
    )
    
}

const HomeLayout = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Raleway&family=Roboto+Mono&display=swap');

  width:100%;
  max-width:99%;
  margin: 1rem .5rem;
  font-family: 'Roboto-Mono', sans-serif;
  color:#233034;
  background:rgba(78, 92, 92, 0.349);;

  .header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    h2{
      margin:2rem 0;
    }
  }

  .current-styles{
    min-height: 17rem;
  }

  .drop-container{
    padding: .2rem .5rem;
    display:flex;
    align-items:center;
    .drop-label{
      margin-right:.5rem;
      font-weight:bold;
    }
  }

  @media (max-width: 1000px) {
    .header{
      flex-direction: column;
      margin-bottom:1rem;
    }
  }
`;


export default Home