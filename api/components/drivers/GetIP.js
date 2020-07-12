var os = require('os');
const dns = require('dns');
const geoip = require('geoip-lite');

var ifaces = os.networkInterfaces();


exports.getIp = async () => {
    let geo = await dns.lookup(os.hostname(), (err, add, fam) => {
        if(add == '127.0.1.1')
            geo = 'buenos aires, ar'
        else 
            geo = geoip.lookup(add) 
            
        return geo     
    })

    return geo
}

