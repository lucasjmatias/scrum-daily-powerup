const axios = require('axios').default;
const {sum, values, defaultTo, prop, pipe, map} = require('ramda')

const baseURL = 'https://api.trello.com/1/'; 
const key = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;
const scrumPluginId = '5e3aa7e26848e22777cdf137';

const contDone = pipe(prop('done'), values, sum, defaultTo(0));

const trelloAxios = axios.create({
  baseURL
});

exports.getBoards = (req, res, next) => {
  const filter = 'open';
  const fields = 'name,shortlink';


  trelloAxios
    .get('members/nurea3/boards', {
      params: {
        fields,
        filter,
        key,
        token
      }
    })
    .then(({data}) => {
      res.status(201).json(data);
    })
    .catch(({message}) => res.status(502).json({message}));
};

exports.getBoard = (req, res, next) => {
  const boardId = req.params.boardId;
  const pluginData = 'true';
  const fields = 'none';

  trelloAxios
    .get(`boards/${boardId}`, {
      params: {
        fields,
        pluginData,
        key,
        token
      }
    })
    .then(({data: {pluginData, ...others}}) => {
      const scrumData = pluginData.find(pd => pd.idPlugin === scrumPluginId);
      let numeroSprint = 0;
      let dias = 0;
      let inicio = '';
      let feriados = [];
      if (scrumData) {
        const {sprint} = JSON.parse(scrumData.value);
        numeroSprint = sprint.numero;
        dias = sprint.dias;
        inicio = sprint.inicio;
        feriados = sprint.feriados;
      }

      const boardData = {
        numeroSprint,
        dias,
        inicio,
        feriados,
        ...others
      }
      res.status(200).json(boardData);
    })
    .catch(({message}) => res.status(502).json({message}));
};

exports.getLists = (req, res, next) => {
  const boardId = req.params.boardId;
  const fields = 'all';
  const filter = 'open';

  trelloAxios
    .get(`boards/${boardId}/lists`, {
      params: {
        fields,
        filter,
        key,
        token
      }
    })
    .then(({data}) => {
      res.status(200).json(data);
    })
    .catch(({message}) => res.status(502).json({message}));
};

exports.getCards = (req, res, next) => {
  const listId = req.params.listId;
  const pluginData = 'true';
  const fields = 'none';
  const filter = 'open';

  trelloAxios
    .get(`lists/${listId}/cards`, {
      params: {
        fields,
        filter,
        pluginData,
        key,
        token
      }
    })
    .then(({data}) => {
      const preparedCards = map(({pluginData, ...others}) => {
        let total = 0;
        let totalFeito = 0;
        let feitoPorDia = {}; 
        const scrumData = pluginData.find(pd => pd.idPlugin === scrumPluginId);
        if (scrumData) {
          const {pontuacao} = JSON.parse(scrumData.value);
          total = pontuacao.total;
          totalFeito = contDone(pontuacao);
          feitoPorDia = pontuacao.done;
        }
        return {
          total,
          totalFeito,
          feitoPorDia,
          ...others,
        }
      }, data);
      res.status(200).json(preparedCards);
    })
    .catch(({message}) => res.status(502).json({message}));
};