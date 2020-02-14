const axios = require('axios').default;

const baseURL = 'https://api.calendario.com.br'; 
const estado = 'DF';
const token = 'bHVjYXMubWF0aWFzLjg3QGdtYWlsLmNvbSZoYXNoPTk5NjM0MDY1';

exports.get = (req, res, next) => {
  const ano = req.query.ano || 2020;

  const calendarAxios = axios.create({
    baseURL
  });

  calendarAxios
    .get('/', {
      params: {
        ano,
        token,
        estado,
        json: true
      }
    })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(({message}) => res.status(502).json({message}));
};