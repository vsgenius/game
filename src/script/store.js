window.application = {
  app: document.querySelector('.app'),
  players: [],
  blocks: {
    //создаем блоки игры
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
    move: (name) => {
      return [
        {
          block: 'h1',
          cls: '',
          textContent: 'Игра',
        },
        {
          block: 'p',
          cls: 'game__player',
          textContent: `Вы против ${name}`,
        },
        {
          block: 'div',
          cls: 'game__btns',
          content: [application.blocks.gameBlock(application.events.move)],
        },
      ];
    },
    waiting: (name) => {
      return [
        {
          block: 'h1',
          cls: '',
          textContent: 'Игра',
        },
        {
          block: 'p',
          cls: 'game__player',
          textContent: `Вы против ${name}`,
        },
        {
          block: 'img',
          cls: ['waiting__clock'],
          attr: {
            src: './src/img/clock.png',
            alt: 'waiting',
          },
        },
        {
          block: 'p',
          cls: ['waiting__text'],
          textContent: 'Ожидаем подключение соперника...',
        },
      ];
    },
    victory: () => {
      return [
        {
          block: 'img',
          cls: ['win__image'],
          attr: {
            src: './src/img/win.png',
            alt: 'win',
          },
        },
        {
          block: 'h2',
          textContent: 'Вы победили',
        },
      ];
    },
    failure: () => {
      return [
        {
          block: 'img',
          cls: ['win__image'],
          attr: {
            src: './src/img/lose.png',
            alt: 'win',
          },
        },
        {
          block: 'h2',
          textContent: 'Вы проиграли',
        },
      ];
    },
    toLobby: () => {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Перейти в лобби',
        event: application.events.enter,
      };
    },
    playMore: () => {
      return {
        block: 'button',
        cls: 'btn',
        textContent: 'Играть еще',
        event: application.events.start,
      };
    },
    imageHeader: function () {
      return {
        block: 'img',
        cls: ['img', 'header__image'],
        textContent: 'Войти в игру',
        attr: {
          src: './src/img/headerImage.png',
        },
      };
    },
    errorText: function () {
      return {
        block: 'p',
        cls: ['waiting__text'],
        textContent: 'Ошибка подключения',
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
              src: 'src/img/rock.png',

              alt: 'rock',
            },
          },
          {
            block: 'img',
            cls: 'image',
            dataSetName: 'scissors',
            attr: {
              src: 'src/img/scissors.png',

              alt: 'scissors',
            },
          },
          {
            block: 'img',
            cls: 'image',
            dataSetName: 'paper',
            attr: {
              src: 'src/img/paper.png',

              alt: 'paper',
            },
          },
        ],
      };
    },
  },
  screens: {
    lose: async function () {
      const name = 'ВладДенис';
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
            textContent: `против ${name}`,
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
      const name = 'ВладДенис';
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
            textContent: `против ${name}`,
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
    waiting: function () {
      //заглушка
      const name = 'ВладСергей';
      const elem = {
        block: 'div',
        cls: 'waiting',
        content: application.blocks.waiting(name),
      };
      return elem;
    },
    game: function () {
      //временная заглушка
      const name = 'ВладДенис';
      const elem = {
        block: 'div',
        cls: 'game',
        content: application.blocks.move(name),
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
      const result = await application.useCases.status();
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
    errorNetwork: function () {
      application.clearTimers();
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'error',
        content: [
          thisBlocks.errorText(),
          thisBlocks.btn('Повторить', () => {
            application.renderScreen('main');
          }),
        ],
      };
      return elem;
    },
  },
  status: function (className) {
    document.querySelector(className).classList.toggle('className');
  },
  renderScreen: async function (screenName) {
    //отрисовываем экран
    application.app.textContent = '';
    application.app.appendChild(
      this.renderEngine(await application.screens[screenName]())
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
    application.sote = token;
  },
  getToken: () => {
    application.sote = window.localStorage.getItem('game-token');
  },
  sote: '',
  events: {
    // GET /player-status
    // GET /player-list
    enter: () => {
      // GET /ping
      if (window.localStorage.getItem('game-token')) {
        application.intervals.updatePlayersList();
        application.renderScreen('lobby');
      } else {
        application.renderScreen('login');
      }
    },
    login: async (e) => {
      // GET /login
      //добавить apilogin
      await application.useCases.login(e);
      application.intervals.updatePlayersList();
      application.renderScreen('lobby');
    },
    start: () => {
      // GET /start
      application.clearTimers();
      application.renderScreen('game');
    },
    move: (e) => {
      const { target } = e;
      if (target.className !== 'image') return;
      console.log(target.dataset.name);
      // GET /play
      // GET /game-status
      //фетч на сервер - получение ответа и отрисовка либо победы либо поражения
      //тестовая заглушка
      setTimeout(() => {
        application.renderScreen('lose');
      }, 1000);
      application.renderScreen('waiting');
    },
  },
  useCases: {
    getPlayersList: async () => {
      // application.renderScreen('loader');
      try {
        const token = window.localStorage.getItem('game-token');
        if (!token) application.renderScreen('login');
        const response = await fetch(
          'https://skypro-rock-scissors-paper.herokuapp.com/player-list?token=' +
            token
        );
        if (response.status !== 200) throw new Error('Ошибка');
        // application.app.textContent = '';
        const result = await response.json();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    login: async (e) => {
      const inputValue = e.target
        .closest('.login')
        .querySelector('.input__login').value;
      application.renderScreen('loader');
      try {
        const response = await fetch(
          'https://skypro-rock-scissors-paper.herokuapp.com/login?login=' +
            inputValue
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
    status: async () => {
      application.renderScreen('loader');
      try {
        const response = await fetch(
          'https://skypro-rock-scissors-paper.herokuapp.com/ping'
        );
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        application.intervals.ping();
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
      }
    },
    ping: async () => {
      try {
        const response = await fetch(
          'https://skypro-rock-scissors-paper.herokuapp.com/ping'
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
  },
  timers: [],
};
