import lose from '../img/lose.png'
import rock from '../img/rock.png'
import paper from '../img/paper.png'
import headerImage from '../img/headerImage.png'
import scissors from '../img/scissors.png'
import win from '../img/win.png'
import clock from '../img/clock.png'


window.application = {
  url: ' https://skypro-rock-scissors-paper.herokuapp.com',
  app: document.querySelector('.app'),
  players: [],
  blocks: {
    //создаем блоки игры
    staticPlayerWinLose:  ()=>{
      const result = [];
      const enemy = application.name;
      for (const key in enemy) {
        if (key !== 'login' && key !== 'rocks' && key !== 'scissors' && key !== 'papers') {
        
        result.push({
          block: 'p',
          cls: ['static__text'],
          textContent: `${key==='wins'?'Побед':'Поражений'} - ${enemy[key]}`,
        })}
      }
      return result;
    },
    staticPlayerMove:  ()=>{
      const result = [];
      const enemy = application.name;
      for (const key in enemy) {
        if (key !== 'login' && key !== 'wins' && key !== 'loses') {
        
        result.push({
          block: 'p',
          cls: ['static__text'],
          textContent: `${enemy[key]}`,
        })}
      }
      return result;
    },
    errorNetwork: async () => {
      return [
        {
          block: 'p',
          cls: ['waiting__text'],
          textContent: 'Ошибка подключения',
        },
        {
          block: 'button',
          cls: 'btn',
          textContent: 'Повторить',
          event: async () => {
            if (application.gameId) {
              const result = await application.useCases.getPlayerStatus();
              // console.log(result);
              if (result['player-status'] && result['player-status'].game) {
                application.gameId = result['player-status'].game.id;
                application.events.start();
                return;
              }
            }
            application.renderScreen('lobby');
          },
        },
        {
          block: 'button',
          cls: 'btn',
          textContent: 'Перелогиниться',
          event: async () => {
            application.token = '';
            application.gameId = '';
            application.renderScreen('login');
          },
        },
      ];
    },
    login: () => {
      return [
        {
          block: 'label',
          cls: '',
          attr: {
            for: 'input__login',
          },
          textContent: 'Введите ник',
        },
        {
          block: 'input',
          cls: ['input__login', 'input__name'],
          attr: {
            id: 'login',
            type: 'login',
          },
        },
        {
          block: 'button',
          cls: 'btn',
          textContent: 'Войти',
          event: application.events.login,
        },
      ];
    },
    playerList: (list) => {
      const result = [
        {
          block: 'h1',
          cls: '',
          textContent: 'Лобби',
        },
      ];
      for (const iterator of list) {
        if (!iterator.you) {
          result.push({
            block: 'p',
            cls: 'lobby__name',
            textContent: iterator.login,
          });
        }
      }
      return result;
    },
    play: () => {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Начать игру',
        event: application.events.start,
      };
    },
    move: () => {
      // console.log(application.blocks.staticPlayerWinLose())
      return [
        {
          block: 'h1',
          cls: '',
          textContent: 'Игра',
        },
        {
          block: 'p',
          cls: 'game__player',
          textContent: `Вы против ${application.name.login}`,
        },
        {
          block: 'div',
          cls: 'static__player',
          content: application.blocks.staticPlayerWinLose(),
        },
        {
          block: 'div',
          cls: 'game__btns',
          content: [application.blocks.gameBlock(application.events.move)],
        },
        {
          block: 'div',
          cls: 'static__move',
          content: application.blocks.staticPlayerMove(),
        },

      ];
    },
    waiting: (text) => {
      return [
        {
          block: 'h1',
          cls: '',
          textContent: 'Игра',
        },
        {
          block: 'p',
          cls: 'game__player',
          textContent: application.name?`Вы против ${application.name.login}`:'',
        },
        {
          block: 'img',
          cls: ['waiting__clock'],
          attr: {
            src: clock,
            alt: 'waiting',
          },
        },
        {
          block: 'p',
          cls: ['waiting__text'],
          textContent: text,
        },
      ];
    },
    victory: () => {
      return [
        {
          block: 'img',
          cls: ['win__image'],
          attr: {
            src: win,
            alt: 'win',
          },
        },
        {
          block: 'h2',
          textContent: `Вы победили ${application.name.login}`,
        },
      ];
    },
    failure: () => {
      return [
        {
          block: 'img',
          cls: ['win__image'],
          attr: {
            src: lose,
            alt: 'lose',
          },
        },
        {
          block: 'h2',
          textContent: `Вы проиграли ${application.name.login}`,
        },
      ];
    },
    toLobby:  () => {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Перейти в лобби',
        event: async () => {
          application.gameId = '';
          application.name = '';
          const playerStatus = await application.useCases.getPlayerStatus()
          if (playerStatus.status === 'error')
          {application.renderScreen('lobby');
        return;}
          application.intervals.updatePlayersList();
          application.renderScreen('lobby');
        },
      };
    },
    playMore: () => {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Играть еще',
        event: () => {
          application.gameId = '';
          application.name = '';
          application.events.start();
        },
      };
    },
    imageHeader: function () {
      return {
        block: 'img',
        cls: ['img', 'header__image'],
        textContent: 'Войти в игру',
        attr: {
          src: headerImage,
        },
      };
    },
    main: function () {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Войти',
        event: application.events.enter,
      };
    },
    gameBlock: function (cb) {
      return {
        block: 'div',
        cls: 'game__btn',
        event: cb,
        content: [
          {
            block: 'img',
            cls: 'image',
            dataSetName: 'rock',
            attr: {
              src: rock,

              alt: 'rock',
            },
          },
          {
            block: 'img',
            cls: 'image',
            dataSetName: 'scissors',
            attr: {
              src: scissors,

              alt: 'scissors',
            },
          },
          {
            block: 'img',
            cls: 'image',
            dataSetName: 'paper',
            attr: {
              src: paper,

              alt: 'paper',
            },
          },
        ],
      };
    },
  },
  screens: {
    lose: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'win',
        content: [
          {
            block: 'h1',
            cls: '',
            textContent: 'Игра',
          },
          {
            block: 'p',
            cls: 'game__player',
            textContent: `Вы против ${application.name.login}`,
          },
          {
            block: 'div',
            cls: 'win__block',
            content: [
              thisBlocks.failure(),
              thisBlocks.playMore(),
              thisBlocks.toLobby(),
            ],
          },
        ],
      };
      return elem;
    },
    win: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'win',
        content: [
          {
            block: 'h1',
            cls: '',
            textContent: 'Игра',
          },
          {
            block: 'p',
            cls: 'game__player',
            textContent: `против ${application.name.login}`,
          },
          {
            block: 'div',
            cls: 'win__block',
            content: [
              thisBlocks.victory(),
              thisBlocks.playMore(),
              thisBlocks.toLobby(),
            ],
          },
          {
            block: 'div',
            cls: 'win__block',
            content: [],
          },
        ],
      };
      return elem;
    },
    waiting: function (text) {
      //заглушка
      const elem = {
        block: 'div',
        cls: 'waiting',
        content: application.blocks.waiting(text),
      };
      return elem;
    },
    game: function () {
      //временная заглушка
      const elem = {
        block: 'div',
        cls: 'game',
        content: application.blocks.move(),
      };
      return elem;
    },
    login: function () {
      const elem = {
        block: 'div',
        cls: 'login',
        content: application.blocks.login(),
      };
      return elem;
    },
    main: async function () {
      const result = await application.useCases.getStatusNetwork();
      const thisBlocks = application.blocks;
      if (result) {
        const elem = {
          block: 'div',
          cls: 'main',
          content: thisBlocks.main(),
        };
        return elem;
      }
    },
    lobby: async function () {
      const listPlayers = await application.useCases.getPlayersList();
      // console.log(listPlayers)
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'lobby',
        content: [
          ...thisBlocks.playerList(listPlayers.list),
          thisBlocks.play(),
        ],
      };
      return elem;
    },
    loader: function () {
      return { block: 'span', cls: 'loader' };
    },
    errorNetwork: async function () {
      application.clearTimers();
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'error',
        content: await thisBlocks.errorNetwork(),
      };
      return elem;
    },
  },
  status: function (className) {
    document.querySelector(className).classList.toggle('className');
  },
  renderScreen: async function (screenName,text) {
    //отрисовываем экран
    application.app.textContent = '';
    application.app.appendChild(
      this.renderEngine(await application.screens[screenName](text))
    );
  },
  renderEngine: function (block) {
    if (block === undefined || block === null || block === false) {
      return document.createTextNode('');
    }
    if (
      typeof block === String ||
      typeof block === Number ||
      typeof block === true
    ) {
      return document.createTextNode(block);
    }
    if (Array.isArray(block)) {
      const frag = document.createDocumentFragment();
      for (const item of block) {
        const itemElem = this.renderEngine(item);
        frag.appendChild(itemElem);
      }
      return frag;
    }
    const elem = document.createElement(block.block);

    elem.appendChild(this.renderEngine(block.content));

    if (block.cls) {
      const classes = [].concat(block.cls);
      elem.classList.add(...classes);
    }
    if (block.attr) {
      for (const [key, value] of Object.entries(block.attr)) {
        elem.setAttribute(key, value);
      }
    }
    if (block.textContent) {
      elem.textContent = block.textContent;
    }
    if (block.event) {
      elem.addEventListener('click', block.event);
    }
    if (block.dataSetName) {
      elem.dataset.name = block.dataSetName;
    }

    return elem;
  },
  renderBlock: function (blockName, container) {
    //отрисовываем отдельный блок, если необходимо (пока не уверен, что пригодится)
    container.appendChild(blockName);
  },
  clearTimers: function () {
    for (const iterator of application.timers) {
      window.clearInterval(iterator);
      window.clearTimeout(iterator);
    }
  },
  setToken: (token) => {
    window.localStorage.setItem('game-token', token);
    application.token = token;
  },
  getToken: () => {
    application.token = window.localStorage.getItem('game-token');
    return application.token;
  },
  token: '',
  events: {
    enter: async () => {
      // console.log('events -login');
      const result = await application.useCases.getPlayerStatus();
      if (window.localStorage.getItem('game-token') && result.status === 'ok') {
        if (result['player-status'].game) {
          application.gameId = result['player-status'].game.id;
          application.events.start();
          return;
        }
        application.clearTimers();
        application.intervals.updatePlayersList();
        application.renderScreen('lobby');
      } else {
        application.renderScreen('login');
      }
    },
    login: async (e) => {
      // console.log(' events -login');
      await application.useCases.getLogin(e);
      application.clearTimers();
      application.intervals.updatePlayersList();
      application.intervals.playerStatus();
      application.renderScreen('lobby');
    },
    start: async () => {
      // console.log('events -start');
      application.clearTimers();
      // console.log(application.gameId);
      if (!application.gameId) {
        const result = await application.useCases.gameStart();
        if (result.message !== 'player is already in game') {
          application.gameId = result['player-status'].game.id;
          // console.log(application.gameId);
        }
      }
      const result = await application.useCases.getStatusGame();
      // console.log(result);
      if (!result || result.message === 'no game id') return;
      // console.log(result);
      if (result['game-status'].status === 'waiting-for-start') {
        application.intervals.gameStatus();
        application.renderScreen('waiting', 'Ожидаем игрока');

      }
      if (result['game-status'].status === 'waiting-for-enemy-move') {
        application.intervals.gameStatus();
        application.renderScreen('waiting', 'Ожидаем хода соперника');

      }
      if (result['game-status'].status === 'waiting-for-your-move') {
        application.renderScreen('game');

      }
      // console.log(result);
      if (result['game-status'].status === 'lose') {
        application.renderScreen('lose');
      }
      if (result['game-status'].status === 'win') {
        application.renderScreen('win');
      }
    },
    move: async (e) => {
      // console.log('events - move');
      const { target } = e;
      if (target.className !== 'image') return;
      // console.log(target.dataset.name);
      const result = await application.useCases.move(target.dataset.name);
      // console.log(result);
      application.events.start();
    },
  },
  useCases: {
    move: async (move) => {
      // console.log('useCases - move');
      try {
        const response = await fetch(
          application.url +
            '/play?token=' +
            application.token +
            '&id=' +
            application.gameId +
            '&move=' +
            move
        );
        // console.log(response);
        if (response.status !== 200) throw new Error('Ошибка');
        const result = await response.json();
        // console.log(result);
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    getPlayersList: async () => {
      // console.log('useCases - getPlayersList');
      // application.renderScreen('loader');
      try {
        const token = window.localStorage.getItem('game-token');
        if (!token) application.renderScreen('login');
        const response = await fetch(
          application.url + '/player-list?token=' + token
        );
        if (response.status !== 200) throw new Error('Ошибка');
        const result = await response.json();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    gameStart: async (e) => {
      // console.log('useCases - gameStart');
      // application.renderScreen('loader');
      try {
        const response = await fetch(
          application.url + '/start?token=' + application.getToken()
        );
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    getLogin: async (e) => {
      // console.log('useCases - getLogin');
      const inputValue = e.target
        .closest('.login')
        .querySelector('.input__login').value;
        if (!inputValue) return;
      application.renderScreen('loader');
      try {
        const response = await fetch(
          application.url + '/login?login=' + inputValue
        );
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        window.localStorage.setItem('game-token', result.token);
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    getStatusNetwork: async () => {
      // console.log('useCases - getStatusNetwork');
      application.renderScreen('loader');
      try {
        const response = await fetch(application.url + '/ping');
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        application.intervals.ping();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    getStatusGame: async () => {
      // console.log('useCases - getStatusGame');
      // application.renderScreen('loader');
      try {
        const response = await fetch(
          application.url +
            '/game-status?token=' +
            application.getToken() +
            '&id=' +
            application.gameId
        );

        if (response.status !== 200) throw new Error('Ошибка');
        // application.app.textContent = '';
        const result = await response.json();
        if (result['game-status'].enemy) {
          application.name = result['game-status'].enemy;
        }
        // console.log(result);
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    ping: async () => {
      // console.log('useCases - ping');
      try {
        const response = await fetch(application.url + '/ping');
        if (response.status !== 200) throw new Error('Ошибка');
        const result = await response.json();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    getPlayerStatus: async () => {
      // console.log('useCases - getPlayerStatus');
      try {
        const response = await fetch(
          application.url + '/player-status?token=' + application.getToken()
        );
        if (response.status !== 200) throw new Error('Ошибка');
        const result = await response.json();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
  },
  intervals: {
    ping: () => {
      const interval = setInterval(async () => {
        await application.useCases.ping();
      }, 2000);
      application.timers.push(interval);
    },
    updatePlayersList: () => {
      const interval = setInterval(async () => {
        const listPlayers = await application.useCases.getPlayersList();
        if (
          JSON.stringify(application.players) !== JSON.stringify(listPlayers)
        ) {
          application.renderScreen('lobby');
        }
        application.players = listPlayers;
      }, 2000);
      application.timers.push(interval);
    },
    gameStatus: () => {
      const interval = setInterval(async () => {
        const status = await application.useCases.getStatusGame();
        if (status['game-status'].enemy) {
          application.name = status['game-status'].enemy;
        }
        application.events.start();
        console.log(status);
      }, 1000);
      application.timers.push(interval);
    },
    playerStatus: () => {
      const interval = setInterval(async () => {
        const status = await application.useCases.getStatusGame();
        // console.log(status);
      }, 110000);
      application.timers.push(interval);
    },
  },
  gameId: '',
  timers: [],
  name:''
};

export default application;