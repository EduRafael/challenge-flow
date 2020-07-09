const geoip = require('geoip-lite');
const ipstack = require('./../../drivers/IpStack.driver')
const {getIp}           = require('./../../drivers/GetIP');

var myip = require('quick-local-ip');

const config = {
    appid   : process.env.API_KEY_IPS,
    url     : `http://api.ipstack.com`
}

exports.validate_ip_server = async ()=>{
    console.log({ip: await getIp()});
    console.log({myip});
    let ipGetInfo = new ipstack(config)
    let ip_address = myip.getLocalIP6();
    let geo = await ipGetInfo.getGeoInfo(ip_address);
    console.log({geo});

    return 3433955;
}

exports.format_result_data = (data) =>{
    let result = [];
    data.date_array.map(item=>{
        let data_filter = data.temperature_data.filter(temp => temp.day == item)
        
        data_filter.map(temp => { delete temp.day })

        result.push({
            day: item,
            temperature_data: data_filter
        })
    })

    let info = {
        city: data.city,
        forecast_data: result
    }
    return info
}