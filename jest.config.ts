// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/setup.js

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  'preset': 'ts-jest',
  'clearMocks': true,
  'coverageDirectory': 'coverage',
  'testMatch': [
    '<rootDir>/spec/**/*.spec.(ts|tsx)'
  ],
  'testEnvironment': 'jsdom'
};

switch(process.env.USE_REACT_VERSION) {
  case '16':
    config.cacheDirectory = '.cache/jest-cache-react-16'
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^react-is((\\/.*)?)$': 'react-is-16$1',
      '^react-dom((\\/.*)?)$': 'react-dom-16$1',
      '^react((\\/.*)?)$': 'react-16$1',
      '^@testing-library/react((\\/.*)?)$': '@testing-library/react-12$1'
    }
    break;
  case '17':
    config.cacheDirectory = '.cache/jest-cache-react-17'
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^react-is((\\/.*)?)$': 'react-is-17$1',
      '^react-dom((\\/.*)?)$': 'react-dom-17$1',
      '^react((\\/.*)?)$': 'react-17$1',
      '^@testing-library/react((\\/.*)?)$': '@testing-library/react-12$1'
    }
    break;
  case '18':
    config.cacheDirectory = '.cache/jest-cache-react-18'
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^react-is((\\/.*)?)$': 'react-is-18$1',
      '^react-dom((\\/.*)?)$': 'react-dom-18$1',
      '^react((\\/.*)?)$': 'react-18$1',
    }
    break;
  default:
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      '^@testing-library/react-hooks((\\/.*)?)$': '@testing-library/react$1',
    }
}

config.reporters = ['default', 'github-actions'];

export default config;