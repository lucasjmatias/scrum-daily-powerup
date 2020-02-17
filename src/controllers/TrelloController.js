const axios = require('axios').default;

const baseURL = 'https://api.trello.com/1/'; 
const key = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;

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
    .then(({data}) => {
      res.status(201).json(data);
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
      res.status(201).json(data);
    })
    .catch(({message}) => res.status(502).json({message}));
};