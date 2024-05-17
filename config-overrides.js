module.exports = function override(config, env) {
    config.ignoreWarnings = [
      {
        module: /@react-aria\/ssr/,
        message: /Failed to parse source map/,
      },
    ];
    return config;
  };
  