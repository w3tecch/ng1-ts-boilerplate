export default class HomeController {

  public name: string;

  constructor() {
    this.name = 'World';
    console.info('HomeController');
  }

  public changeName() {
    this.name = 'angular-tips';
  }

}
