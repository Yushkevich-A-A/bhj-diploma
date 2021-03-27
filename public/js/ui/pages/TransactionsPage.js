/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {


  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw Error('Элемента не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  static lastOptions;

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('remove-account')) {
      this.removeAccount();
    }

    if(e.target.classList.contains('transaction__remove')) {
      this.removeTransaction(e.target.dataset.id);
    }
  });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions) {
      return;
    }

    if(confirm('Вы действительно хотите удалить счет?')) {
      Account.remove({id:this.lastOptions}, () => {
        this.clear();
        App.updateWidgets();
      })
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить транзакцию?')) {
      Transaction.remove(id, () => {
          App.update();
      })
    } 
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options) {
      return;
    }

    this.lastOptions = options.account_id;
    Account.get(this.lastOptions, responseDataAccount => {
      this.renderTitle(responseDataAccount.name);

        Transaction.list (options, responseTransactions => {
          this.renderTransactions(responseTransactions.data);
        })
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const contentTitle = document.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const listMonth = [
      'январь', 
      'февраль', 
      'март', 
      'апрель', 
      'май', 
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ]

    date = date.replace('T', ' ').replace('.', ' ')
    let arrDateAndTime = date.split(' ');
    const arrDate = arrDateAndTime[0].split('-');
    const arrTime = arrDateAndTime[1].split(':');

    return `${arrDate[2]} ${listMonth[arrDate[1] - 1]} ${arrDate[0]} г. в ${arrTime[0]}:${arrTime[1]}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const transaction = document.createElement('div');
    transaction.classList.add('transaction');
    (item.type === 'income')? 
      transaction.classList.add('transaction_income') :
      transaction.classList.add('transaction_expense');
    transaction.classList.add('row');

    const transactionDetails = document.createElement('div');
    transactionDetails.className = "col-md-7 transaction__details"
    transaction.appendChild(transactionDetails);

    const transactionIcon = document.createElement('div');
    transactionIcon.classList.add('transaction__icon');
    transactionDetails.appendChild(transactionIcon);

    const faMoney = document.createElement('span');
    faMoney.className = 'fa fa-money fa-2x';
    transactionIcon.appendChild(faMoney);


    const transactionInfo = document.createElement('div');
    transactionInfo.classList.add('transaction__info');
    transactionDetails.appendChild(transactionInfo);

    const transactionTitle = document.createElement('h4');
    transactionTitle.classList.add('transaction__title');
    transactionTitle.textContent = item.name;
    transactionInfo.appendChild(transactionTitle);

    const transactionDate = document.createElement('div');
    transactionDate.classList.add('transaction__date');
    transactionDate.textContent = this.formatDate(item.created_at);
    transactionInfo.appendChild(transactionDate);


    const colMd3 = document.createElement('div');
    colMd3.classList.add("col-md-3");
    transaction.appendChild(colMd3);

    const transactionSumm = document.createElement('div');
    transactionSumm.classList.add("transaction__summ");
    transactionSumm.textContent = item.sum;
    colMd3.appendChild(transactionSumm);

    const currency = document.createElement('span');
    currency.classList.add("currency");
    currency.textContent = '₽';
    transactionSumm.appendChild(currency);


    const transactionControls = document.createElement('div');
    transactionControls.className = "col-md-2 transaction__controls";
    transaction.appendChild(transactionControls);

    const transactionRemove = document.createElement('button');
    transactionRemove.className = "btn btn-danger transaction__remove";
    transactionRemove.dataset.id = item.id;
    transactionControls.appendChild(transactionRemove);

    const faTrash = document.createElement('i');
    faTrash.className = "fa fa-trash";
    transactionRemove.appendChild(faTrash);

    return transaction;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');
    content.innerHTML = '';
    for (let item of data) {
      content.appendChild(this.getTransactionHTML(item));
    }

  }
}