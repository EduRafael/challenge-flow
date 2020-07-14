'use strict';
const { find_location_info, find_current_info, find_forecast_info } = require('./../repository/ConditionsRepository');
const { validate_ip_server, format_result_data } = require('./../service/ConditionServices');
const AppError = require('../../../exceptions/AppError');

exports.find_location = async (req, res) => {
	try {
		let name_city = await validate_ip_server({ ip: req.headers['x-forwarded-for'] });
		let result = await find_location_info(name_city);

		if (result instanceof AppError)
			throw new AppError('No se encontro la ciudad especificada, verifique la información', 404);

		return res.status(200).send({ response: 'success', result });
	} catch (e) {
		return res.status(e.status).json({ response: 'failure', error: e.message });
	}
};

exports.find_current = async (req, res) => {
	try {
		let name_city = await validate_ip_server({ ip: req.headers['x-forwarded-for'], ...req.params });
		let result = await find_current_info(name_city);

		if (result instanceof AppError)
			throw new AppError('No se encontro la ciudad especificada, verifique la información', 404);

		return res.status(200).send({ response: 'success', result });
	} catch (e) {
		return res.status(e.status).json({ response: 'failure', error: e.message });
	}
};

exports.find_forecast = async (req, res) => {
	try {
		let name_city = await validate_ip_server({ ip: req.headers['x-forwarded-for'], ...req.params });
		let result = await find_forecast_info(name_city);

		if (result instanceof AppError)
			throw new AppError('No se encontro la ciudad especificada, verifique la información', 404);

		let data = format_result_data(result);

		return res.status(200).send({ response: 'success', result: data });
	} catch (e) {
		return res.status(e.status).json({ response: 'failure', error: e.message });
	}
};
