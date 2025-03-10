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

    pushMenu.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('.sidebar-mini')) {
        const bodySidebarMini = e.target.closest('.sidebar-mini');
        bodySidebarMini.classList.toggle('sidebar-open');
        bodySidebarMini.classList.toggle('sidebar-collapse');
      }

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
    document.querySelector('.sidebar-menu').addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('.menu-item')) {
        const item = e.target.closest('.menu-item').className.split('_').pop();
        if (item !== 'logout') {
          return App.getModal(item).open();
        }
        User.logout(User.current(), err => {
          if (err) {
            console.log(err);
            return;
          }
          App.setState('init');
        });
      }
    });
  }
}