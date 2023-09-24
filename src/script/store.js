window.application = {
  app: document.querySelector('.app'),
  blocks: {
    //создаем блоки игры
    lobbyName: function (name) {
      return {
        block: 'p',
        cls: 'lobby__name',
        textContent: name,
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
    waitingImage: function () {
      return {
        block: 'img',
        cls: ['waiting__clock'],
        attr: {
          src: './src/img/clock.png',
          alt: 'waiting',
        },
      };
    },
    waitingText: function () {
      return {
        block: 'p',
        cls: ['waiting__text'],
        textContent: 'Ожидаем подключение соперника...',
      };
    },
    errorText: function () {
      return {
        block: 'p',
        cls: ['waiting__text'],
        textContent: 'Ошибка подключения',
      };
    },
    btn: function (name, cb) {
      return {
        block: 'button',
        cls: 'btn',
        textContent: name,
        event: cb,
      };
    },
    btnNoActive: function (name) {
      return {
        block: 'button',
        cls: ['btn', 'btn__no-active'],
        textContent: name,
      };
    },
    loginLabel: function () {
      return {
        block: 'label',
        cls: '',
        attr: {
          for: 'input__login',
        },
        textContent: 'Введите ник',
      };
    },
    loginInput: function () {
      return {
        block: 'input',
        cls: ['input__login', 'input__name'],
        attr: {
          id: 'login',
          type: 'login',
        },
      };
    },
    head: function (name) {
      return {
        block: 'h1',
        cls: '',
        textContent: name,
      };
    },
    waitingPlayer: function (name) {
      return {
        block: 'p',
        cls: 'game__player',
        textContent: `Вы против ${name}`,
      };
    },
    head2: function (name) {
      return {
        block: 'h2',
        textContent: name,
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
    winImage: function () {
      return {
        block: 'img',
        cls: ['win__image'],
        attr: {
          src: './src/img/win.png',
          alt: 'win',
        },
      };
    },
    loseImage: function () {
      return {
        block: 'img',
        cls: ['win__image'],
        attr: {
          src: './src/img/lose.png',
          alt: 'lose',
        },
      };
    },
  },
  getImagePathName: function (name) {
    const map = {
      Камень: 'src/img/rock.png',
      Ножницы: 'src/img/scissors.png',
      Бумага: 'src/img/paper.png',
    };
    return map[name];
  },
  screens: {
    //создаем фрагмент экрана игры из существующих блоков
    lose: async function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'win',
        content: [
          thisBlocks.head('Игра'),
          thisBlocks.head5('ВладДенис'),
          {
            block: 'div',
            cls: 'win__block',
            content: [
              thisBlocks.loseImage(),
              thisBlocks.head2('Вы проиграли!'),
              thisBlocks.btn('Играть еще', application.events.startGame),
              thisBlocks.btn('Лобби', application.events.lobby),
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
          thisBlocks.head('Игра'),
          thisBlocks.waitingPlayer('ВладДенис'),
          {
            block: 'div',
            cls: 'win__block',
            content: [
              thisBlocks.winImage(),
              thisBlocks.head2('Вы победили!'),
              thisBlocks.btn('Играть еще', application.events.startGame),
              thisBlocks.btn('Лобби', application.events.lobby),
            ],
          },
        ],
      };
      return elem;
    },
    waiting: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'waiting',
        content: [
          thisBlocks.head('Игра'),
          thisBlocks.waitingPlayer('ВладДенис'),
          thisBlocks.waitingImage(),
          thisBlocks.waitingText(),
        ],
      };
      return elem;
    },
    game: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'game',
        content: [
          thisBlocks.head('Игра'),
          thisBlocks.waitingPlayer('ВладДенис'),
          {
            block: 'div',
            cls: 'game__btns',
            content: [thisBlocks.gameBlock(application.events.move)],
          },
        ],
      };
      return elem;
    },
    login: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'login',
        content: [
          thisBlocks.loginLabel(),
          thisBlocks.loginInput(),
          thisBlocks.btn('Войти', application.events.login),
        ],
      };
      return elem;
    },
    main: async function () {
      const result = await application.api.status();
      const thisBlocks = application.blocks;
      if (result) {
        const elem = {
          block: 'div',
          cls: 'main',
          content: thisBlocks.btn('Войти', application.events.enter),
        };
        return elem;
      }
    },
    lobby: async function () {
      const listPlayers = await application.api.playerList();
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'lobby',
        // заменить на функцию apilobby
        content: [],
      };
      elem.content.push(thisBlocks.head('Лобби'));
      for (const iterator of listPlayers.list) {
        if (!iterator.you) {
          elem.content.push(thisBlocks.lobbyName(iterator.login));
        }
      }
      elem.content.push(
        thisBlocks.btn('Начать игру', application.events.startGame)
      );
      return elem;
    },
    loader: function () {
      return { block: 'span', cls: 'loader' };
    },
    errorNetwork: function () {
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
  events: {
    // GET /player-status
    // GET /player-list
    enter: () => {
      // GET /ping
      if (window.localStorage.getItem('game-token')) {
        application.intervals.listPlayers();
        application.renderScreen('lobby');
      } else {
        application.renderScreen('login');
      }
    },
    login: async (e) => {
      // GET /login
      //добавить apilogin
      await application.api.login(e);
      application.intervals.listPlayers();
      application.renderScreen('lobby');
    },
    startGame: () => {
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
        application.renderScreen('win');
      }, 1000);
      application.renderScreen('waiting');
    },
  },
  api: {
    playerList: async () => {
      application.renderScreen('loader');
      try {
        const token = window.localStorage.getItem('game-token');
        if (!token) application.renderScreen('login');
        const response = await fetch(
          'https://skypro-rock-scissors-paper.herokuapp.com/player-list?token=' +
            token
        );
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
        application.clearTimers();
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
        console.log(response.status);
        if (response.status !== 200) throw new Error('Ошибка');
        application.app.textContent = '';
        const result = await response.json();
        window.localStorage.setItem('game-token', result.token);
        console.log(result);
        return result;
      } catch (error) {
        application.renderScreen('errorNetwork');
        application.clearTimers();
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
        application.clearTimers();
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
        application.clearTimers();
      }
    },
  },
  intervals: {
    ping: () => {
      const interval = setInterval(async () => {
        await application.api.ping();
      }, 2000);
      application.timers.push(interval);
    },
    listPlayers: () => {
      const interval = setInterval(async () => {
        await application.api.playerList();
        application.renderScreen('lobby');
      }, 2000);
      application.timers.push(interval);
    },
  },
  timers: [],
};
