const geoip = require('geoip-lite');
const ip_api = require('../../drivers/IpApiDriver')
const {getIp}           = require('./../../drivers/GetIP');
const AppError = require('./../../../exceptions/AppError')
const moment = require('moment')
const AK_IPAPI = process.env.API_KEY_IPAPI;

var myip = require('quick-local-ip');

const config = {
    appid   : AK_IPAPI,
    url     : `http://api.ipapi.com`
}

exports.validate_ip_server = async (params)=>{
    try {
        if(params.city && params.city != ""){
            if(params.city.length < 3)
                throw new AppError('Error en el nombre de la ciudad, verifique por favor', 400)
            return params.city
        } else {
            let ip_address = "";
            //TODO: en el momento de poder accerder a la ip publica de cualquier servidor, se deberia poder descomentar la siguiente función
            //      por ahora, la dejo comentada y forwardeo una ip desde el lado de postman y en el .env, una vez esté funcional las validaciones de abajo
            //      deberian ser eliminadas porque no es la forma correcta de hacerlo.
            //ip_address =myip.getLocalIP4();
            
            if(params.ip && params.ip != "")
                ip_address = params.ip; 
            else
                ip_address = process.env.IP_BA || '186.182.181.155'

            let ipGetInfo = new ip_api(config)
            let geo = await ipGetInfo.getGeoInfo(ip_address);
            
            let {city, country_code } = geo;
            let name_city = `${city}, ${country_code}`
                
            return name_city;
            }    
    } catch (e) {
        throw new AppError(e.message, e.status);
    }
}

exports.format_result_data = (data) =>{
    let result = [];
    data.date_array.map(item => {
        if (item != moment().format('YYYY-MM-DD')){
            let data_filter = data.temperature_data.filter(temp => temp.day == item)
            data_filter.map(temp => { delete temp.day }) 
            result.push({
                day: item,
                temperature_data: data_filter
            })
        }
    })

    let info = {
        city: data.city,
        forecast_data: result
    }
    return info
}
