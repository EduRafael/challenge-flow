const OpenWeatherMap    = require('./../../drivers/OpenWeatherMap');
const AppError          = require('./../../../exceptions/AppError')

const config = {
    appid  : process.env.API_KEY_OWM,
    url_current : `http://api.openweathermap.org/data/2.5/weather`,
    url_forecast: `http://api.openweathermap.org/data/2.5/forecast`
}

const driver = new OpenWeatherMap(config);

exports.find_location_info = async (params) => {
    try {
        let data = await driver.getCurrent_LocationInfo(params)
        return data.city
    } catch (e) {
        return new AppError(e.message, e.status)
    }
}

exports.find_current_info = async (params) => {
    try {
        let data = await driver.getCurrent_LocationInfo(params)
        return data
    } catch (e) {
        return new AppError(e.message, e.status)
    }
}

exports.find_forecast_info = async (params) => {
    try {
        let data = await driver.getForecast_LocationInfo(params)
        return data
    } catch (e) {
        return new AppError(e.message, e.status)
    }
}