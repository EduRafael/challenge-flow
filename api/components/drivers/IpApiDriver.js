const req = require('request');

module.exports = class IpStack{
    constructor(config) {
        this.appid  = config.appid;
        this.url    = config.url;
    }

    getGeoInfo (ip_address) {
        return new Promise ((resolve, reject)=>{
            //TODO: no me permite acceder a la IP pública, actualmente funciona con la harcodeada
            req.get(`${this.url}/${ip_address}?access_key=${this.appid}`, (err, data)=>{
                if(err){
                    return reject(err)
                }

                let result = JSON.parse(data.body)
                if (result.city == undefined || result.city == "")
                    return resolve({city: ""})
                return resolve(result)
            })
        });
    };
}