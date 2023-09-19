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
    gameBlock: function (name, cb) {
      return {
        block: 'div',
        cls: 'game__btn',
        dataSetName: name,
        event: cb,
        content: [
          {
            block: 'img',
            attr: {
              src: window.application.getImagePathName(name),
              alt: name,
            },
          },
          {
            block: 'button',
            cls: 'btn',
            textContent: name,
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
    lose: function () {
      const thisBlocks = window.application.blocks;
      function cb() {}
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
              thisBlocks.btn('Лобби', application.events.login),
            ],
          },
        ],
      };
      return elem;
    },
    win: function () {
      const thisBlocks = window.application.blocks;
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
              thisBlocks.btn('Лобби', application.events.login),
            ],
          },
        ],
      };
      return elem;
    },
    waiting: function () {
      const thisBlocks = window.application.blocks;
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
      const thisBlocks = window.application.blocks;
      const elem = {
        block: 'div',
        cls: 'game',
        content: [
          thisBlocks.head('Игра'),
          thisBlocks.waitingPlayer('ВладДенис'),
          {
            block: 'div',
            cls: 'game__btns',
            content: [
              thisBlocks.gameBlock('Камень', application.events.move),
              thisBlocks.gameBlock('Ножницы', application.events.move),
              thisBlocks.gameBlock('Бумага', application.events.move),
            ],
          },
        ],
      };
      return elem;
    },
    login: function () {
      const thisBlocks = window.application.blocks;
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
    main: function () {
      const thisBlocks = application.blocks;
      const elem = {
        block: 'div',
        cls: 'main',
        content: [thisBlocks.btn('Войти', application.events.enter)],
      };

      return elem;
    },
    lobby: function () {
      const thisBlocks = window.application.blocks;
      const elem = {
        block: 'div',
        cls: 'lobby',
        content: [
          thisBlocks.head('Лобби'),
          thisBlocks.lobbyName('ВладДенис'),
          thisBlocks.lobbyName('ИванСергей'),
          thisBlocks.lobbyName('АнтонМакар'),
          thisBlocks.btn('Начать игру', application.events.startGame),
        ],
      };
      return elem;
    },
  },
  status: function (className) {
    document.querySelector(className).classList.toggle('className');
  },
  renderScreen: function (screenName) {
    //отрисовываем экран
    window.application.app.textContent = '';
    window.application.app.appendChild(
      this.renderEngine(application.screens[screenName]())
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
  events: {
    // GET /player-status
    // GET /player-list
    enter: () => {
      // GET /ping
      application.renderScreen('login');
    },
    login: () => {
      // GET /login
      application.renderScreen('lobby');
    },
    startGame: () => {
      // GET /start
      application.renderScreen('game');
    },
    move: (e) => {
      const { target } = e;
      console.log(target.closest('.game__btn').dataset.name);
      // GET /play
      // GET /game-status
      //фетч на сервер - получение ответа и отрисовка либо победы либо поражения
      //тестовая заглушка
      setTimeout(() => {
        application.renderScreen('win');
      }, 2000);
      application.renderScreen('waiting');
    },
  },
  timers: [],
};
