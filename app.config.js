module.exports = function (env, pkg) {
  switch (env) {
    case 'dev':
      return buildConfig('http://api.bubu:3210', ['info', 'debug', 'warn', 'error']);
    case 'prod':
      return buildConfig('http://api.bubu:3210', []);
  }

  function buildConfig(apiUrl, logger) {
    return {
      ENV: JSON.stringify(env),
      NAME: JSON.stringify(pkg.name),
      VERSION: JSON.stringify(pkg.version),
      API_URL: JSON.stringify(apiUrl),
      LOGGER: JSON.stringify(logger)
    };
  }
};
