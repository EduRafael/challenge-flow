/***
 * Test para obtener la data de la ciudad a partir de la IP forwarded
 * uso la ip que mantengo seleccionada en el .env como IP_BA que indica una IP 
 * de la Buenos aires, actualmente en el .env.example están ipv4 de Berazategui y Buenos aires
 * 
 * autor: Eduardo Alvarado
 */


const supertest = require('supertest');
const should    = require('should');
const app       = require('../index')

describe('GET /v1/location', ()=>{
    it('Reply with location data in json format', (done)=>{
        supertest(app)
            .get('/v1/location')
            .set('X-Forwarded-For', process.env.IP_BA || '186.182.181.155')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res)=> {
                res.should.have.property('status', 200);
                res.should.be.json;
                
                //Response status
                res.body.should.have.property('response', 'success')

                //Response body
                res.body.result.should.be.instanceof(Object);
                res.body.result.should.have.property('name_city', 'Buenos Aires').and.be.instanceof(String);
                res.body.result.geo_cordinates.should.be.instanceof(Object);
                res.body.result.geo_cordinates.should.have.property('lat',-34.61).and.be.instanceof(Number);
                res.body.result.geo_cordinates.should.have.property('lon', -58.38).and.be.instanceof(Number); 
                res.body.result.should.have.property('shortcut_country', 'AR').and.be.instanceof(String);        

                done()
            })
    })
})