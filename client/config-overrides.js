// config-overrides.js
const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@features': path.resolve(__dirname, 'src/features/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
    '@hooks': path.resolve(__dirname, 'src/hooks/'),
    '@lib': path.resolve(__dirname, 'src/lib/'),
    '@services': path.resolve(__dirname, 'src/services/'),
    '@data': path.resolve(__dirname, 'src/data/'),
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@app': path.resolve(__dirname, 'src/app/'),
  }),
);