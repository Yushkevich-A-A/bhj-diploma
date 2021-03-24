/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const pushMenu = document.querySelector('.sidebar-toggle');
    const bodySidebarMini = document.querySelector('.sidebar-mini');

    pushMenu.addEventListener('click', e => {    
      e.preventDefault();
      bodySidebarMini.classList.toggle('sidebar-open');
      bodySidebarMini.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const battonsSideBarList = document.getElementsByClassName('menu-item');
    for (let item of battonsSideBarList) {
      item.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        const value = item.className.split('_').pop();
        console.log(value);
        if (value === 'logout') {
          User.logout( null, response => {
            if (response.success = true) {
              App.setState('init');
            }
          });
        } else {
          App.getModal(value);
        }
      })
    }
  }
}