export default class HomeController {

  public name: string;

  constructor() {
    this.name = 'World';
  }

  public changeName() {
    this.name = 'angular-tips';
  }

}
