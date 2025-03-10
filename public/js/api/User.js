/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent( user ) {
    const obj = {};
    for (let item of Object.keys(user)) {
      if (item === 'id' || item === 'name') {
        obj[item] = user[item];
      }
    }

    localStorage.setItem('user', JSON.stringify(obj));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    } 
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( callback ) {
      createRequest({
        url: this.url + '/current',
        method: 'GET',
        responseType: 'json',
        data: this.current(),

        callback: (err, response) => {
          if (response && response.user) {
            this.setCurrent(response.user);
          } else if (err) {
            console.log(err);
          }

          callback();
        }
      });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback) {
    createRequest({
      url: this.url + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback ) {
    createRequest({
      url: this.url + '/register',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback:  (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback ) {
    createRequest({
      url: this.url + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback:  (err, response) => {
        if (response) {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
