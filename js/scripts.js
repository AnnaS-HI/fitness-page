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
    // Показать окно
    popup.style.display = 'block';
    // Показать затемнение
    overlay.style.display = 'block';
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
