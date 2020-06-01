'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-my-proj:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file([
      '.eslintignore',
      '.eslintrc.js',
      '.gitignore',
      'tsconfig.json',
      'webpack.config.js'
    ]);
  });
});
