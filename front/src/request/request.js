const URL = process.env.REACT_APP_API_BE || 'http://localhost:9001';

export const getLocation = () => {
    return fetch(`${URL}/v1/location`)
           .then(res => res.json())
           .then(error => error.json())
};

export const getCurrentData = params => {
    console.log({URL});
    return fetch(`${URL}/v1/current/${params}`,{
        method: 'GET'
      })
           .then(res => res.json())
           
};

export const getForecastData = (params) => {
    return fetch(`${URL}/v1/forecast/${params}`,{
        method: 'GET'
      }).then(res => res.json())
};