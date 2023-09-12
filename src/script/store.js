
window.application = {
  mainContainer: document.querySelector('.app'),
  blocks: { //создаем блоки игры
    button: function (buttonText, className) {
      const button = document.createElement('button');
      button.classList.add('btn', `${className}`);
      button.textContent = buttonText;
      return button;
    },
    input: function (placeHolder, className) {
      const input = document.createElement('input');
      input.classList.add('input__login', `${className}`);
      input.placeholder = placeHolder;
      return input;
    },
    image: function (path, className) {
      const image = document.createElement('img');
      image.classList.add('img', `${className}`);
      image.src = path;
      return image;
    }
  },
  screens: { //создаем фрагмент экрана игры из существующих блоков
    login: function () {
      const fragment = document.createDocumentFragment();
      fragment.appendChild(application.blocks.image('./src/img/headerImage.png', 'header_image'));
      fragment.appendChild(application.blocks.input('Введите имя', 'input_name'));
      fragment.appendChild(application.blocks.button('Войти в игру', 'btn__enter'));
      return fragment;
    }
  },
  status: function (className) {
    document.querySelector(className).classList.toggle('className');
  },
  renderScreen: function (screenName) { //отрисовываем экран
    application.mainContainer.innerHTML = '';
    application.mainContainer.appendChild(screenName);
  },
  renderBlock: function (blockName, container) { //отрисовываем отдельный блок, если необходимо (пока не уверен, что пригодится)
    container.appendChild(blockName);
  },
  timers: []
}