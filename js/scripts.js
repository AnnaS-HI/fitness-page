function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex'; // Показываем модальное окно
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none'; // Скрываем модальное окно
  }
}


// Скрипт для секции Intensives
// Найти все карточки интенсивов
const cards = document.querySelectorAll('.intensives__card');
// Найти элемент overlay
const overlay = document.querySelector('.overlay');

// Добавить обработчик событий для каждой карточки
cards.forEach(card => {
  // Найти элемент с всплывающим окном внутри карточки
  const popup = card.querySelector('.popup');
  const image = card.querySelector('.intensives__image'); // Находим изображение

  // Событие для показа окна при клике на изображение
  image.addEventListener('click', () => {
    // Устанавливаем координаты поп-апа относительно экрана
    const rect = image.getBoundingClientRect(); // Получаем положение изображения
    const scrollY = window.scrollY; // Текущее положение прокрутки
    popup.style.top = `${rect.top + scrollY + rect.height / 2}px`; // Центр относительно Y
    popup.style.left = `${rect.left + rect.width / 2}px`; // Центр относительно X
    popup.style.transform = 'translate(-50%, -50%)'; // Центрируем относительно точки

    // Показываем поп-ап
    popup.style.display = 'block';
    overlay.style.display = 'block'; // Показываем затемнение
  });

  // Событие для закрытия окна (по крестику)
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
  });
});

// Закрытие затемнения при клике на него
overlay.addEventListener('click', () => {
  // Скрыть все всплывающие окна
  document.querySelectorAll('.popup').forEach(popup => {
    popup.style.display = 'none';
  });
  // Скрыть затемнение
  overlay.style.display = 'none';
});
// Функция для отображения поп-апа
function showPopup(popupElement) {
  // Получаем текущую позицию прокрутки
  const scrollY = window.scrollY;

  // Устанавливаем положение поп-апа
  popupElement.style.display = 'block';
  popupElement.style.top = `${scrollY + window.innerHeight / 2}px`; // Середина экрана по Y
  popupElement.style.left = '50%'; // Середина экрана по X
  popupElement.style.transform = 'translate(-50%, -50%)';
}

// Пример использования
document.querySelectorAll('.intensives__image').forEach((image) => {
  image.addEventListener('click', () => {
    const popup = image.closest('.intensives__card').querySelector('.popup');
    showPopup(popup);
  });
});
// Скрипт для секции Intensives конец


//главная
// Открытие и закрытие меню
// Находим элементы
const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// Открытие/закрытие меню по кнопке
menuButton.addEventListener('click', (event) => {
  const isOpen = navMenu.classList.toggle('active'); // Переключаем класс active
  body.classList.toggle('menu-open', isOpen); // Блокируем прокрутку страницы
  event.stopPropagation(); // Останавливаем всплытие события, чтобы оно не закрыло меню
});

// Закрытие меню при клике на свободную область
document.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && event.target !== menuButton) {
    navMenu.classList.remove('active'); // Убираем класс active
    body.classList.remove('menu-open'); // Возвращаем прокрутку страницы
  }
});

//секция результаты
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.reviews__track');
  const cards = document.querySelectorAll('.reviews__card');
  const prevButton = document.querySelector('.reviews__button--prev');
  const nextButton = document.querySelector('.reviews__button--next');
  const cardWidth = cards[0].offsetWidth;
  const visibleCards = 3; // Количество карточек, отображаемых одновременно
  let index = visibleCards; // Начинаем со второй группы (с учетом клонов)

  // Клонирование карточек для зацикливания
  const firstClones = Array.from(cards)
    .slice(0, visibleCards)
    .map(card => card.cloneNode(true));
  const lastClones = Array.from(cards)
    .slice(-visibleCards)
    .map(card => card.cloneNode(true));

  // Добавляем клоны в начало и конец трека
  firstClones.forEach(clone => track.appendChild(clone));
  lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

  // Устанавливаем начальную позицию трека
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  const updateTrackPosition = () => {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  const resetTrackPosition = (newIndex) => {
    setTimeout(() => {
      track.style.transition = 'none';
      index = newIndex;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }, 500); // Отключаем анимацию после перехода
  };

  // Обработчик кнопки Next
  nextButton.addEventListener('click', () => {
    index++;
    updateTrackPosition();

    // Если достигли конца, возвращаемся к началу
    if (index === cards.length + visibleCards) {
      resetTrackPosition(visibleCards);
    }
  });

  // Обработчик кнопки Prev
  prevButton.addEventListener('click', () => {
    index--;
    updateTrackPosition();

    // Если достигли начала, возвращаемся к концу
    if (index === 0) {
      resetTrackPosition(cards.length);
    }
  });

  // Автоматическая прокрутка
  setInterval(() => {
    index++;
    updateTrackPosition();

    // Зацикливание при автоматическом переходе
    if (index === cards.length + visibleCards) {
      resetTrackPosition(visibleCards);
    }
  }, 5000); // Прокрутка каждые 5 секунд
});







