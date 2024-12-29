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
