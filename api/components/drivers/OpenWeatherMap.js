const req = require('request');

module.exports = class OpenWeatherMap{
    constructor(config) {
        this.appid          = config.appid;
        this.url_current    = config.url_current;
        this.url_forecast   = config.url_forecast
    }

    /**
     * Función que permite extraer el resultado de las condiciones climaticas actuales para la ciudad escogida
     */
    getCurrent_LocationInfo (city_name) {
        return new Promise ((resolve, reject)=>{
            req.get(`${this.url_current}?q=${city_name}&units=metric&appid=${this.appid}`, (err, data)=>{
                if(err){
                    return reject(err)
                }
                let data_json = JSON.parse(data.body);
                if(data_json.cod == 400 || data_json.cod == 404)
                    return reject({err: "No se encontro la ciudad especificada, verifique la información"})
                
                let info = this.parseResponse(data_json);
                return resolve(info)

            })
        });
    };

    /**
     * Función que permite extraer el resultado de las condiciones climaticas para 5 días
     * mostrando resultados por cada 3 horas por dia
     */
    getForecast_LocationInfo (city_name) {
        return new Promise ((resolve, reject)=>{
            req.get(`${this.url_forecast}?q=${city_name}&units=metric&appid=${this.appid}`, (err, data)=>{
                if(err)
                    return reject(err)
                
                let data_json = JSON.parse(data.body);
                if(data_json.cod == 400 || data_json.cod == 404)
                    return reject({err: "No se encontro la ciudad especificada, verifique la información"})
                
                let result = this.parseJsonFormat(data_json)
                return resolve(result)
            })
        });
    };


    /**
     * Esta función sirve para darle un formato estandar al resultado de la consulta
     * de modo que permita procesarla de una forma adecuada en otro proceso, ya que la api
     * devuelve información que no le daremos uso en este momento, por lo que solo dejamos
     * cosas especificas para dicha operación.
     */
    parseResponse(data_json){
        console.log({data_json});
        let info = {
            city : {
                name_city: data_json.name,
                geo_cordinates: {
                    lat: data_json.coord.lat,
                    lon: data_json.coord.lon
                },
                shortcut_country: data_json.sys.country
            },
            temperature_info: {
                temp: data_json.main.temp,
                temp_min: data_json.main.temp_min,
                temp_max: data_json.main.temp_max,
                temp_thermal: data_json.main.feels_like,
                humidity: data_json.main.humidity
            },
            wind_speed: data_json.wind.speed,
            icon_data: data_json.weather.icon
        }
        return info
    }

    /**
     * Esta función sirve para darle un formato estandar al resultado de la consulta
     * de modo que permita procesarla de una forma adecuada en otro proceso, ya que la api
     * devuelve información que no le daremos uso en este momento, por lo que solo dejamos
     * cosas especificas para dicha operación.
     */
    parseJsonFormat (data) {
        var data_info_json = [], date_data = [];

        data.list.map(item => {
            let info = {
                day:item.dt_txt.substring(0,10),
                temperature_info: {
                    temp: item.main.temp,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    temp_thermal: item.main.feels_like,
                    humidity: item.main.humidity
                },
                wind_speed: item.wind.speed,
                icon_data: item.weather.icon,
                hour: item.dt_txt.substring(11,16)
            }
            
            if(!date_data.includes(item.dt_txt.substring(0,10)))
                date_data.push(item.dt_txt.substring(0,10))

            data_info_json.push(info);
        })
        
        let result= {
            city:{
                name_city: data.city.name,
                geo_cordinates: {
                    lat: data.city.coord.lat,
                    lon: data.city.coord.lon
                },
                shortcut_country: data.city.country
            },
            temperature_data: data_info_json,
            date_array: date_data
        }
        return result;
    }
}