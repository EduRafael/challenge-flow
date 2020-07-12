'use strict'
//required
const express   = require('express');
const cors      = require('cors');
const env       = require('dotenv').config();

//settings
const PORT   = process.env.NODE_PORT || 9090
const app    = express();

//Def cors allow 
const allowCrossDomain = function (req, res, next) {
    //res.header('Access-Control-Allow-Origin', 'https://orderdispatcher.herokuapp.com');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With , X-Auth-Token');
    next()
};

//Use cors allow
app.use(allowCrossDomain)
app.set('trust proxy', true);
const conditions = require('./components/condition/router/ConditionsRoutes')
app
    .use('/v1', conditions);

try {
    app.listen(PORT, ()=>{
        console.info({'SERVER': `Application up and running on PORT:[${PORT}]`})
    })
} catch (err) {
    console.error({ERR: err.message});
}