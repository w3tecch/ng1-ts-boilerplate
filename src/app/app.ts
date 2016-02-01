import '../assets/scss/main.scss';

import 'angular';

declare var VERSION: string;
declare var BUBU: boolean;

module app {

  angular
    .module('app', [])
    .run(() => {
      console.info('Angular is ready!', VERSION, BUBU);
    });

}
