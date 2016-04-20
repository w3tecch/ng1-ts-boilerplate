/**
 * Configure angular local storage
 */
const angularLocalStorage = (localStorageServiceProvider) => {
  localStorageServiceProvider
    .setPrefix('ngApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
};

angularLocalStorage.$inject = ['localStorageServiceProvider'];

export default angularLocalStorage;
