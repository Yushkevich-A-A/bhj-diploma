/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static url = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      url: this.url,
      method: 'GET',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        callback(response);
      }
      
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.url,
      method: 'PUT',
      responseType: 'json',
      data: data,
      callback: (err) => {
        if (err) {
          console.log(err);
          return;
        }
        callback();
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.url,
      method: 'DELETE',
      responseType: 'json',
      data: data,
      callback: (err) => {
        if (err) {
          console.log(err);
          return;
        }
        callback();
      }
    });
  }
}
