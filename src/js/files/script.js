// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";



document.addEventListener('DOMContentLoaded', function() {
  // КЛОНИРУЕМ BG в каждый .bg-main__bg =====================================================
  const firstBgMainElement = document.querySelector('.bg-main__bg');
  if (firstBgMainElement && firstBgMainElement.firstElementChild) {
      const childToClone = firstBgMainElement.firstElementChild.cloneNode(true);
      const bgMainElements = document.querySelectorAll('.bg-main__bg');
      bgMainElements.forEach((element, index) => {
          if (index !== 0) {
              element.appendChild(childToClone.cloneNode(true));
          }
      });
  }
  // ===================================================================

  // Работа с навигацией в Хедере при переключении экранов ================================
  const listPcBody = document.querySelector('.list-pc__body');
  const listPcBtn = document.querySelector('.list-pc__btn');
  const listPcList = document.querySelector('.list-pc__list');
  const listPcLinks = document.querySelectorAll('.list-pc__link');
  const listPcBtnSpan = listPcBtn.querySelector('span');

  const secBlack = document.querySelector('.sec-black');
  const secGreen = document.querySelector('.sec-green');
  const secFruit = document.querySelector('.sec-fruit');
  const secConct = document.querySelector('.sec-conct');

  // Устанавливаем минимальную ширину для list-pc__body
  if (listPcList) {
      const listWidth = listPcList.offsetWidth;
      listPcBody.style.minWidth = `${listWidth}px`;
  }

  listPcBtn.addEventListener('click', function () {
      listPcBody.classList.toggle('_active');
  });

  listPcLinks.forEach(function (link) {
      link.addEventListener('click', function () {
          listPcBody.classList.remove('_active');
          listPcBtnSpan.textContent = link.textContent;
      });
  });

  // Функция для обновления текста span в зависимости от класса
  function updateSpanTextBasedOnClass() {
      const htmlElement = document.documentElement;

      if (htmlElement.classList.contains('fp-section-1') && secBlack) {
          listPcBtnSpan.textContent = secBlack.textContent;
      } else if (htmlElement.classList.contains('fp-section-2') && secGreen) {
          listPcBtnSpan.textContent = secGreen.textContent;
      } else if (htmlElement.classList.contains('fp-section-3') && secFruit) {
          listPcBtnSpan.textContent = secFruit.textContent;
      } else if (htmlElement.classList.contains('fp-section-4') && secConct) {
          listPcBtnSpan.textContent = secConct.textContent;
      }
  }

  // Настройка MutationObserver для отслеживания изменений классов на теге html
  const observer = new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
          if (mutation.attributeName === 'class') {
              updateSpanTextBasedOnClass();
          }
      }
  });

  observer.observe(document.documentElement, { attributes: true });

  // Первоначальное обновление текста span на случай, если класс уже установлен
  updateSpanTextBasedOnClass();



  // подставляем данные ссылок во все места ---------------------------
  fetch('files/data.json')
  .then(response => response.json())
  .then(data => {
      if (Array.isArray(data)) {
          data.forEach(item => {
              const packItem = document.querySelector(`#pack-${item.id}`);
              if (packItem) {
                  const imgLink = packItem.querySelector('.pack__img-link');
                  const circleLink = packItem.querySelector('.circle__link');
                  
                  if (imgLink) {
                      imgLink.href = item.link || '#';
                  }
                  if (circleLink) {
                      circleLink.href = item.link || '#';
                  }
              }
          });
      }
  })
  .catch(error => console.error('Error loading JSON:', error));
  // --------------------------------------------------------------------------



    // POPUP - WIN ==========================================================================
    var winPopup = document.querySelector('.win-popup');
    if (winPopup) {
        setTimeout(function() {
            winPopup.classList.add('opened');
        }, 2500);
        var closeButton = document.querySelector('.win-popup__close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                // Убираем класс "opened" при клике на кнопку закрытия
                winPopup.classList.remove('opened');
            });
        }
    }


});
