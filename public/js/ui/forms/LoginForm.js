/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, err => {
      this.element.reset();     

      if (err) {
        console.log(err);
        return;
      }

      App.getModal(this.element.closest('.modal').dataset.modalId).close();
      App.setState( 'user-logged' );

    })
  }
}