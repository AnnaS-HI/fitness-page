//интенсив

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


