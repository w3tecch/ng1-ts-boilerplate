module.exports = function (env, pkg) {
  switch (env) {
    case 'dev':
      return buildConfig('http://api.bubu:3210');
    case 'prod':
      return buildConfig('http://api.bubu:3210');
  }

  function buildConfig(apiUrl) {
    return {
      ENV: JSON.stringify(env),
      NAME: JSON.stringify(pkg.name),
      VERSION: JSON.stringify(pkg.version),
      API_URL: JSON.stringify(apiUrl)
    };
  }
};
