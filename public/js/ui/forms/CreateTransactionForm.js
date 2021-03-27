/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select')
    select.innerHTML = '';
    Account.list( User.current(), response => {
        for (let data of response.data) {
          const option = document.createElement('option');
          option.value = data.id;
          option.textContent = data.name;
          select.appendChild(option);
        }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    this.element.reset();
    Transaction.create(data, () => {
          App.getModal(this.element.closest('.modal').dataset.modalId).close();
          App.update();
    });
  }
}