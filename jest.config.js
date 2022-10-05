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
      '^react((\\/.*)?)$': 'react-16$1',
      '^@testing-library/react((\\/.*)?)$': '@testing-library/react-12$1'
    }
    break;
  case '17':
    module.exports.cacheDirectory = '.cache/jest-cache-react-17'
    module.exports.moduleNameMapper = {
      ...module.exports.moduleNameMapper,
      '^react-is((\\/.*)?)$': 'react-is-17$1',
      '^react-dom((\\/.*)?)$': 'react-dom-17$1',
      '^react((\\/.*)?)$': 'react-17$1',
      '^@testing-library/react((\\/.*)?)$': '@testing-library/react-12$1'
    }
    break;
  default:
    module.exports.moduleNameMapper = {
      ...module.exports.moduleNameMapper,
      '^@testing-library/react-hooks((\\/.*)?)$': '@testing-library/react$1',
    }
}

module.exports.reporters = ['default', 'github-actions'];