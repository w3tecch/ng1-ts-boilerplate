/**
 * Configure angular translate
 */
const angularTranslate = ($translateProvider) => {
  $translateProvider.translations('en', require('./../../assets/i18n/en.json'));
  $translateProvider.translations('de', require('./../../assets/i18n/de.json'));
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
};

angularTranslate.$inject = ['$translateProvider'];

export default angularTranslate;
