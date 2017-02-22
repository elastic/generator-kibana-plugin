import _ from 'lodash';
import generator from 'yeoman-generator';
import pkg from '../../../package.json';
import { checkNodeVersion, checkForKibana } from './env';

module.exports = generator.Base.extend({
  constructor() {
    generator.Base.apply(this, arguments);

    this.option('advanced');
    this.option('minimal');
  },

  checkEnvironment() {
    checkForKibana(this.log);
    checkNodeVersion(this.log);
  },

  promptingPluginName() {
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

  promptingDescription() {
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

  promptingTargetKibanaVersion() {
    var done = this.async();
    this.prompt({
      type: 'list',
      name: 'kbnVersion',
      message: 'Target Kibana Version',
      choices: ['master', '6.0.0', '5.1.0', '5.0.0']
    }, function (answers) {
      this.kbnVersion = answers.kbnVersion === 'master' ? 'kibana' : answers.kbnVersion;
      done();
    }.bind(this));
  },

  promptingGenerateApp() {
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

  promptingGenerateTranslations() {
    if (!this.options.advanced) {
      this.generateTranslations = !this.options.minimal;
      return;
    }
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'generateTranslations',
      message: 'Should transation files be generated?',
      default: ''
    }, function (answers) {
      this.generateTranslations = answers.generateTranslations;
      done();
    }.bind(this));
  },

  promptingGenerateHack() {
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

  promptingGenerateApi() {
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

  writing() {
    var vars = {
      name: this.appname,
      generateApi: this.generateApi,
      generateApp: this.generateApp,
      generateTranslations: this.generateTranslations,
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

    if (this.generateTranslations) {
      input.push(this.templatePath('translations/**/*'));
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

  initGitRepo() {
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

  installingDevDeps() {
    this.installDependencies({ npm: true, bower: false });
  },
});
