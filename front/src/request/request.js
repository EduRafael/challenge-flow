const url_be = process.env.URL_BE;

export const getLocation = () => {
    return fetch(`${url_be}/v1/location`)
           .then(res => res.json())
           .then(error => error.json())
};

export const getCurrentData = params => {
    return fetch(`http://localhost:9001/v1/current/${params}`)
           .then(res => res.json())
           
};

export const getForecastData = (params) => {
    return fetch(`http://localhost:9001/v1/forecast/${params}`)
           .then(res => res.json())
};