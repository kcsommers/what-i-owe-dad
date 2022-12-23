require('dotenv').config();
const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  remotes: {
    kc_components: process.env.COMPONENTS_PATH
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
