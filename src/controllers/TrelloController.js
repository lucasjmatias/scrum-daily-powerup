const axios = require('axios').default;

const baseURL = 'https://api.trello.com/1/'; 
const key = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;
const scrumPluginId = '5e3aa7e26848e22777cdf137';

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
      let dias = 0;
      let inicio = '';
      if (scrumData) {
        const {sprint} = JSON.parse(scrumData.value);
        dias = sprint.dias;
        inicio = sprint.inicio;
      }

      const boardData = {
        dias,
        inicio,
        ...others
      }
      res.status(201).json(boardData);
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