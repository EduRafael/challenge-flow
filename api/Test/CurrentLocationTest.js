const supertest = require('supertest');
const should    = require('should');
const app       = require('../index')

describe('GET /v1/current/', ()=>{
    it('Respond with current location data via ip_api in json format', (done)=>{
        supertest(app)
            .get('/v1/current/')
            .set('X-Forwarded-For', '186.182.181.155')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res)=> {
                res.should.have.property('status', 200);
                res.should.be.json;
                //Response status
                res.body.should.have.property('response', 'success')

                //Response body
                res.body.result.should.be.instanceof(Object);

                //Result of the response with information from the city
                res.body.result.city.should.be.instanceof(Object);
                res.body.result.city.should.have.property('name_city', 'Buenos Aires').and.be.instanceof(String);
                res.body.result.city.geo_cordinates.should.be.instanceof(Object);
                res.body.result.city.geo_cordinates.should.have.property('lat',-34.61).and.be.instanceof(Number);
                res.body.result.city.geo_cordinates.should.have.property('lon', -58.38).and.be.instanceof(Number); 
                res.body.result.city.should.have.property('shortcut_country', 'AR').and.be.instanceof(String);

                //Result of the response with information from the temperature         
                res.body.result.temperature_info.should.be.instanceof(Object);
                res.body.result.temperature_info.should.have.property('temp').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_min').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_max').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_thermal').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('humidity').and.be.instanceof(Number);

                //Result of the response with important information
                res.body.result.should.have.property('wind_speed').and.be.instanceof(Number);
                res.body.result.should.have.property('icon_data').and.be.instanceof(String);
                res.body.result.should.have.property('description').and.be.instanceof(String);

                done()
            })
    })
})

describe('GET /v1/current/Tokyo', ()=>{
    it('Respond with current location data via city name in json format', (done)=>{
        supertest(app)
            .get('/v1/current/Tokyo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res)=> {
                res.should.have.property('status', 200);
                res.should.be.json;
                //Response status
                res.body.should.have.property('response', 'success')

                //Response body
                res.body.result.should.be.instanceof(Object);

                //Result of the response with information from the city
                res.body.result.city.should.be.instanceof(Object);
                res.body.result.city.should.have.property('name_city', 'Tokyo').and.be.instanceof(String);
                res.body.result.city.geo_cordinates.should.be.instanceof(Object);
                res.body.result.city.geo_cordinates.should.have.property('lat').and.be.instanceof(Number);
                res.body.result.city.geo_cordinates.should.have.property('lon').and.be.instanceof(Number); 
                res.body.result.city.should.have.property('shortcut_country', 'JP').and.be.instanceof(String);

                //Result of the response with information from the temperature         
                res.body.result.temperature_info.should.be.instanceof(Object);
                res.body.result.temperature_info.should.have.property('temp').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_min').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_max').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('temp_thermal').and.be.instanceof(Number);
                res.body.result.temperature_info.should.have.property('humidity').and.be.instanceof(Number);

                //Result of the response with important information
                res.body.result.should.have.property('wind_speed').and.be.instanceof(Number);
                res.body.result.should.have.property('icon_data').and.be.instanceof(String);
                res.body.result.should.have.property('description').and.be.instanceof(String);

                if(err){
                    res.should.have.property('status', 404);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('response', 'f')
                }


                done()
            })
    })
})

describe('GET /v1/current/bunos aires', ()=>{
    it('Respond with location error for sending the misspelled city name', (done)=>{
        supertest(app)
            .get('/v1/current/bunos aires')
            .set('X-Forwarded-For', '186.182.181.155')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res)=> {
                if (err){
                    res.should.have.property('status', 404);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('response', 'failure')
                    res.body.should.have.property('error', 'No se encontro la ciudad especificada, verifique la información')
                }

                done()
            })
    })
})