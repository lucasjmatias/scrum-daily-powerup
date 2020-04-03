const axios = require('axios').default;

const baseURL = 'https://api.calendario.com.br'; 
const estado = 'DF';
const token =  process.env.CALENDAR_TOKEN;

exports.get = (req, res, next) => {
  const ano = req.query.ano || new Date().getFullYear();

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
    .then(({data}) => {
      const feriados = data
          .filter(feriado => feriado.type_code !== "9" && !feriado.description.includes('14h'))
          .map(({date}) => date);
      res.status(200).json(feriados);
    })
    .catch(({message}) => res.status(502).json({message}));
};