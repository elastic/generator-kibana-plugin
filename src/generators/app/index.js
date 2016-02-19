var _ = require('lodash');
var generator = require('yeoman-generator');
var pkg = require('../../../package.json');

module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
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

  writing: function () {
    var vars = {
      name: this.appname,
      description: this.description,
      title: _.startCase(this.appname),
      camelCaseName: _.camelCase(this.appname)
    };

    var input = [
      this.templatePath('**/*'),
      this.templatePath('**/.*')
    ];
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
