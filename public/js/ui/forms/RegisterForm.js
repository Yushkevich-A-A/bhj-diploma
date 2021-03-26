/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
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