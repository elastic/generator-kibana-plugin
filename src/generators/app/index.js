var _ = require('lodash');
var generator = require('yeoman-generator');
var pkg = require('../../../package.json');

module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.option('advanced');
    this.option('minimal');
  },

  promptingPluginName: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your Plugin Name',
      default: this.appname
    }, function (answers) {
      this.appname = _.snakeCase(answers.name);
      done();
    }.bind(this));
  },

  promptingDescription: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'description',
      message: 'Short Description',
      default: 'An awesome Kibana plugin'
    }, function (answers) {
      this.description = answers.description;
      done();
    }.bind(this));
  },

  promptingGenerateApp: function () {
    if (!this.options.advanced) {
      this.generateApp = !this.options.minimal;
      return;
    }
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'generateApp',
      message: 'Should an app component be generated?',
      default: ''
    }, function (answers) {
      this.generateApp = answers.generateApp;
      done();
    }.bind(this));
  },

  promptingGenerateHack: function () {
    if (!this.options.advanced) {
      this.generateHack = !this.options.minimal;
      return;
    }
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'generateHack',
      message: 'Should an hack component be generated?',
      default: ''
    }, function (answers) {
      this.generateHack = answers.generateHack;
      done();
    }.bind(this));
  },

  promptingGenerateApi: function () {
    if (!this.options.advanced) {
      this.generateApi = !this.options.minimal;
      return;
    }
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'generateApi',
      message: 'Should a server API be generated?',
      default: ''
    }, function (answers) {
      this.generateApi = answers.generateApi;
      done();
    }.bind(this));
  },

  writing: function () {
    var vars = {
      name: this.appname,
      generateApi: this.generateApi,
      generateApp: this.generateApp,
      generateHack: this.generateHack,
      kbnVersion: this.kbnVersion,
      description: this.description,
      title: _.startCase(this.appname),
      camelCaseName: _.camelCase(this.appname)
    };

    var input = [
      this.templatePath('*'),
      this.templatePath('.*')
    ];

    if (this.generateApi) {
      input.push(this.templatePath('server/**/*'));
    }

    if (this.generateHack) {
      input.push(this.templatePath('public/hack.js'));
    }

    if (this.generateApp) {
      input.push(this.templatePath('public/app.js'));
      input.push(this.templatePath('public/less/main.less'));
      input.push(this.templatePath('public/templates/index.html'));
    }

    this.fs.copyTpl(input, '', vars);
    this.fs.move(
      this.destinationPath('..gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  initGitRepo: function () {
    this.composeWith(
      'git-init',
      {
        options: { commit: `Initialize Kibana Plugin (${pkg.name} v${pkg.version})` }
      },
      {
        local: require.resolve('generator-git-init'),
      }
    );
  },

  installingDevDeps: function () {
    this.installDependencies({ npm: true, bower: false });
  },
});
