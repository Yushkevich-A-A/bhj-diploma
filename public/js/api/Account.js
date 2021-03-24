/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: this.url + '/account',
      method: 'GET',
      responseType: 'json',
      data: {
        id: id,
      },
      callback: callback,
    });
  }
}
