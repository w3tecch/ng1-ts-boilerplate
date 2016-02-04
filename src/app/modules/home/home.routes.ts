let routing = ($stateProvider) => {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.view.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
};

routing.$inject = ['$stateProvider'];

export default routing;
