'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fse = require('fs-extra');

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
        message: 'Project Name',
        default: path.basename(process.cwd())
      },
      {
        when: function(response) {
          // return if current path equals name passed
          return response.name === path.join(process.cwd(), response.name)
        },
        type: 'confirm',
        name: 'create_dir',
        message: `Current directory ${path.basename(process.cwd())} does not match project name. Create new directory?`
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Add project directory
    if (path.basename(this.destinationPath()) !== this.props.name) {
        fse.mkdirpSync(this.props.name);
        this.destinationRoot(this.destinationPath(this.props.name));
    }
    
    // Add configuration files
    this.fs.copy(
      this.templatePath('configurations/**/*'),
      this.destinationPath(this.destinationRoot()),
      {globOptions: {dot: true}}
    );

    // Make directory for project source code files
    fse.mkdirSync(path.join(this.destinationPath(), 'src'))
    
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
        'mini-css-extract-plugin', 
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
