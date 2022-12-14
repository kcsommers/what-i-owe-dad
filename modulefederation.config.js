const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  remotes: {
    kc_components: 'kc_components@http://localhost:4000/remoteEntry.js'
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react']
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom']
    }
  }
};
