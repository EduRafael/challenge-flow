import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Day from './ForecasDay'
import './Forecast.css'

const TempCarousel = data => {
    const forecast = data.data.forecast_data    
    return (
        <Carousel className="Main">
            { forecast && forecast.map((item,i)=><Day key={i} {...item}/> )}
        </Carousel>
    )
};

export default TempCarousel;

 