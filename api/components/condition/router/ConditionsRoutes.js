const router            = require('express').Router();
const cors              = require('cors');
const { find_location,
        find_current,
        find_forecast } = require('./../controller/ConditionsController');
router
    .get('/location',           [cors()], find_location)
    .get('/current/:city*?',    [cors()], find_current)
    .get('/forecast/:city*?',   [cors()], find_forecast)



module.exports = router;