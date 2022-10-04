// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/setup.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom'
};

if(process.env.USE_REACT_16 === 'true'){
  module.exports.cacheDirectory = '.cache/jest-cache-react-16'
  module.exports.moduleNameMapper = {
    ...module.exports.moduleNameMapper,
    '^react-is((\\/.*)?)$': 'react-is-16$1',
    '^react-dom((\\/.*)?)$': 'react-dom-16$1',
    '^react((\\/.*)?)$': 'react-16$1'
  }
}