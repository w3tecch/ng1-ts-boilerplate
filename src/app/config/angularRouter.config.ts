/**
 * Angular Router Config
 */
const angularRouter = ($locationProvider) => {
  $locationProvider.html5Mode(true);
};

angularRouter.$inject = ['$locationProvider'];

export default angularRouter;
