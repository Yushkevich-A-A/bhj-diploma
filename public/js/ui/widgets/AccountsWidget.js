/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw Error('элемент не существует');
    }
    this.element = element;
    this.elementList = this.element.getElementsByClassName('account');

    // this.update(); // в описании выше написано, что необходимо вызвать метод AccountsWidget.update(), но данный метод вызывается в App,получается что здесь нет необходимости вызов делать?
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', e => {
      App.getModal('createAccount').open();
    });

    for(let item of this.elementList) {
      item.addEventListener('click', e => {
        e.preventDefault();
        this.onSelectAccount(item);
      })
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      this.clear();
      Account.list(User.current(), response => {
        this.clear();
        this.renderItem(response.data);
        this.registerEvents();
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    while (this.elementList.length !== 0) {
      this.elementList[0].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    if (element.classList.contains('active')) {
      element.classList.toggle('active');
    } else {
      for (let item of this.elementList) {
        item.classList.remove('active');
      }
      element.classList.add('active');
    }
    
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const spanBankName = document.createElement('span');
    const spanQuantity = document.createElement('span');

    li.classList.add('account');
    li.dataset.id = item.id;

    a.href = '#';

    spanBankName.textContent = item.name;
    spanQuantity.textContent = item.sum;

    li.appendChild(a);
    a.appendChild(spanBankName);
    spanBankName.insertAdjacentText('afterend', ' / ')
    a.appendChild(spanQuantity);

    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    for (let item of data) {
          this.element.appendChild(this.getAccountHTML(item));
    }
  }
}
