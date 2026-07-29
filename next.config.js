const originalConfig = require('./next.config.visual_edit_bak.js');
const raw = (typeof originalConfig === 'object' && originalConfig.__esModule) ? originalConfig.default : originalConfig;

function injectWebpack(config) {
  const orig = config.webpack;
  config.webpack = (webpackConfig, options) => {
    webpackConfig.module.rules.push({
      test: /\.(tsx|jsx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{ loader: '/opt/hostedapp/node/root/ast_worker/inspector-loader.js' }],
    });
    return orig ? orig(webpackConfig, options) : webpackConfig;
  };
  return config;
}

if (typeof raw === 'function') {
  module.exports = (...args) => Promise.resolve(raw(...args)).then(c => injectWebpack(c));
} else {
  module.exports = injectWebpack({ ...raw });
}
