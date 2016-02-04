export default class HomeController {
  static $inject = [
    '$scope',
    'observeOnScope'
  ];

  public name: string;
  public observedChange: string;
  public newValue: string;
  public oldValue: string;

  constructor($scope, observeOnScope: any) {
    console.info('HomeController');
    this.name = 'World';

    // Listen for changes on the name
    observeOnScope($scope, 'name').subscribe((change) => {
      this.observedChange = change;
      this.newValue = change.newValue;
      this.oldValue = change.oldValue;
    });

  }

}
