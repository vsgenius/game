window.application = {
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
        cls: ['img', 'header_image'],
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
        textContent: 'Ожидаем подключение соперника....',
      };
    },
    btn: function (name) {
      return {
        block: 'button',
        cls: 'btn',
        textContent: name,
      };
    },
    btnNoActive: function (name) {
      return {
        block: 'button',
        cls: ['btn', 'btn_noctive'],
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
        cls: ['input__login', 'input_name'],
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
    head5: function (name) {
      return {
        block: 'h5',
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
    gameBlock: function (name) {
      switch (name) {
        case 'Камень':
          return {
            block: 'div',
            cls: 'game__btn',
            content: [
              {
                block: 'img',
                attr: {
                  src: './src/img/rock.png',
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
        case 'Ножницы':
          return {
            block: 'div',
            cls: 'game__btn',
            content: [
              {
                block: 'img',
                attr: {
                  src: './src/img/scissors.png',
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
        case 'Бумага':
          return {
            block: 'div',
            cls: 'game__btn',
            content: [
              {
                block: 'img',
                attr: {
                  src: './src/img/paper.png',
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
      }
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
  screens: {
    //создаем фрагмент экрана игры из существующих блоков
    lose: function () {
      const elem = {
        block: 'div',
        cls: 'win',
        content: [
          window.application.blocks.head('Игра'),
          window.application.blocks.head5('ВладДенис'),
          {
            block: 'div',
            cls: 'win__block',
            content: [
              window.application.blocks.loseImage(),
              window.application.blocks.head2('Вы проиграли!'),
              window.application.blocks.btn('Играть еще'),
              window.application.blocks.btn('Лобби'),
            ],
          },
        ],
      };
      return elem;
    },
    win: function () {
      const elem = {
        block: 'div',
        cls: 'win',
        content: [
          window.application.blocks.head('Игра'),
          window.application.blocks.head5('ВладДенис'),
          {
            block: 'div',
            cls: 'win__block',
            content: [
              window.application.blocks.winImage(),
              window.application.blocks.head2('Вы победили!'),
              window.application.blocks.btn('Играть еще'),
              window.application.blocks.btn('Лобби'),
            ],
          },
        ],
      };
      return elem;
    },
    waiting: function () {
      const elem = {
        block: 'div',
        cls: 'waiting',
        content: [
          window.application.blocks.head('Игра'),
          window.application.blocks.head5('ВладДенис'),
          window.application.blocks.waitingImage(),
          window.application.blocks.waitingText(),
        ],
      };

      return elem;
    },
    game: function () {
      const elem = {
        block: 'div',
        cls: 'game',
        content: [
          window.application.blocks.head('Игра'),
          window.application.blocks.head5('ВладДенис'),
          {
            block: 'div',
            cls: 'game__btns',
            content: [
              window.application.blocks.gameBlock('Камень'),
              window.application.blocks.gameBlock('Ножницы'),
              window.application.blocks.gameBlock('Бумага'),
            ],
          },
        ],
      };
      return elem;
    },
    login: function () {
      const elem = {
        block: 'div',
        cls: 'login',
        content: [
          window.application.blocks.loginLabel(),
          window.application.blocks.loginInput(),
          window.application.blocks.btn('Войти'),
          window.application.blocks.btnNoActive('Войти'),
        ],
      };

      return elem;
    },
    main: function () {
      const elem = {
        block: 'div',
        cls: 'main',
        content: [
          window.application.blocks.btn('Войти'),
          window.application.blocks.btnNoActive('Войти'),
        ],
      };

      return elem;
    },
    lobby: function () {
      const elem = {
        block: 'div',
        cls: 'lobby',
        content: [
          window.application.blocks.head('Лобби'),
          window.application.blocks.lobbyName('ВладДенис'),
          window.application.blocks.lobbyName('ИванСергей'),
          window.application.blocks.lobbyName('АнтонМакар'),
          window.application.blocks.btn('Начать игру'),
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
    const app = document.querySelector('.app');
    app.textContent = '';
    app.appendChild(
      this.renderEngine(window.application.screens[screenName]())
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

    return elem;
  },
  renderBlock: function (blockName, container) {
    //отрисовываем отдельный блок, если необходимо (пока не уверен, что пригодится)
    container.appendChild(blockName);
  },
  timers: [],
};
