const supertest = require('supertest');
const should    = require('should');
const app       = require('../index');
const AppError = require('../exceptions/AppError');

describe('GET /v1/forecast/', ()=>{
    it('Respond with location forecast data via ip_api in json format', (done)=>{
        supertest(app)
            .get('/v1/forecast/')
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
                res.body.result.city.geo_cordinates.should.have.property('lat').and.be.instanceof(Number);
                res.body.result.city.geo_cordinates.should.have.property('lon').and.be.instanceof(Number); 
                res.body.result.city.should.have.property('shortcut_country', 'AR').and.be.instanceof(String);

                //Result of the response with information from the temperature  
                res.body.result.forecast_data.should.be.instanceof(Array);
                res.body.result.forecast_data[0].should.have.property('day').and.be.instanceof(String);       
                res.body.result.forecast_data[0].temperature_data.should.be.instanceof(Array);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.be.instanceof(Object);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_min').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_max').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_thermal').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('humidity').and.be.instanceof(Number);

                //Result of the response with important information
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('wind_speed').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('icon_data').and.be.instanceof(String);
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('description').and.be.instanceof(String);

                done()
            })
    })
})

describe('GET /v1/forecast/Tokyo', ()=>{
    it('Respond with location forecast data using city name, in json format', (done)=>{
        supertest(app)
            .get('/v1/forecast/Tokyo')
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
                res.body.result.forecast_data.should.be.instanceof(Array);
                res.body.result.forecast_data[0].should.have.property('day').and.be.instanceof(String);       
                res.body.result.forecast_data[0].temperature_data.should.be.instanceof(Array);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.be.instanceof(Object);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_min').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_max').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('temp_thermal').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].temperature_info.should.have.property('humidity').and.be.instanceof(Number);

                //Result of the response with important information
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('wind_speed').and.be.instanceof(Number);
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('icon_data').and.be.instanceof(String);
                res.body.result.forecast_data[0].temperature_data[0].should.have.property('description').and.be.instanceof(String);

                done()
            })
    })
})

describe('GET /v1/forecast/bunos aires', ()=>{
    it('Respond with a location error for the forecast using the misspelled city name', (done)=>{
        supertest(app)
            .get('/v1/forecast/bunos aires')
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