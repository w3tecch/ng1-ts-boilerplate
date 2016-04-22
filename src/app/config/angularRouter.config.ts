/**
 * Angular Router Config
 */
const angularRouter = ($locationProvider) => {
  $locationProvider.html5Mode(false);
};

angularRouter.$inject = ['$locationProvider'];

export default angularRouter;
