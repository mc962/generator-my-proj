'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the tremendous ${chalk.red('generator-my-proj')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Add configuration files
    this.fs.copy(
      this.templatePath('configurations/**/*'),
      this.destinationPath(this.destinationRoot()),
      {globOptions: {dot: true}}
    );

    // Update package.json
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      {
        "scripts": {
          "watch": "webpack --watch",
          "start": "webpack-dev-server --open",
          "build": "webpack"
        }
      }
    )
  }

  install() {
    this.npmInstall(
      [
        '@babel/core', 
        '@typescript-eslint/eslint-plugin', 
        '@typescript-eslint/parser', 
        'babel-loader', 
        'css-loader', 
        'eslint', 
        'html-webpack-plugin', 
        'minicss-extract-plugin', 
        'speed-measure-webpack-plugin',
        'style-loader', 
        'ts-loader', 
        'typescript', 
        'webpack', 
        'webpack-bundle-analyzer',
        'webpack-cli', 
        'webpack-dev-server'
      ],
      {'save-dev': true}
    )
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
