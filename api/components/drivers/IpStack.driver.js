const req = require('request');

module.exports = class IpStack{
    constructor(config) {
        this.appid  = config.appid;
        this.url    = config.url;
    }

    getGeoInfo (ip_address) {
        return new Promise ((resolve, reject)=>{
            req.get(`${this.url}/${ip_address}?access_key=${this.appid}`, (err, data)=>{
                if(err)
                    return reject(err)
                
                return resolve(JSON.parse(data.body))
            })
        });
    };
}