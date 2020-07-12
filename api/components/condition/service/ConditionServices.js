const geoip = require('geoip-lite');
const ipstack = require('./../../drivers/IpStack.driver')
const {getIp}           = require('./../../drivers/GetIP');
const AppError = require('./../../../exceptions/AppError')
const moment = require('moment')

var myip = require('quick-local-ip');

const config = {
    appid   : process.env.API_KEY_IPS,
    url     : `http://api.ipstack.com`
}

exports.validate_ip_server = async (params)=>{
    try {
        if(params.city && params.city != ""){
            if(params.city.length < 3)
                throw new AppError('Error en el nombre de la ciudad, verifique por favor', 400)
            return params.city
        } else {
            console.log({ip: await getIp()});
            let ipGetInfo = new ipstack(config)

            let ip_address = myip.getLocalIP4();
            let geo = await ipGetInfo.getGeoInfo(ip_address);
            console.log({geo});
            return 'buenos aires, ar';
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