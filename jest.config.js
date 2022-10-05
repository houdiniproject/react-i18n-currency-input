// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/setup.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
};

switch(process.env.USE_REACT_VERSION) {
  case '16':
    module.exports.cacheDirectory = '.cache/jest-cache-react-16'
    module.exports.moduleNameMapper = {
      ...module.exports.moduleNameMapper,
      '^react-is((\\/.*)?)$': 'react-is-16$1',
      '^react-dom((\\/.*)?)$': 'react-dom-16$1',
      '^react((\\/.*)?)$': 'react-16$1'
    }
    break;

    default: // nothing to do actually
      break;

}