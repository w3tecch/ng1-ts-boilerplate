module.exports = function (env, pkg) {
  return {
    NAME: JSON.stringify(pkg.name),
    VERSION: JSON.stringify(pkg.version),
    ENV: JSON.stringify(require(`./config/${env}.json`))
  };
};
