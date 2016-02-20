'use strict';
import * as yeoman from 'yeoman-generator';
import _ from 'lodash';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the titel of the field format I should create?'
    },{
      type: 'checkbox',
      name: 'fieldTypes',
      message: 'For which field types will this converter work?',
      choices: ['string', 'number', 'boolean', 'date', 'ip', 'attachment', 'geo_point', 'geo_shape', 'murmur3', 'unknown'],
      validate: (value) => {
        return value.length ? true : "You have to specify at least one type.";
      }
    }];

    this.prompt(prompts, (props) => {
      this.props = props;
      done();
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('field_format.js'),
      this.destinationPath(`public/field_formats/${_.snakeCase(this.props.name)}.js`),
      {
        ...this.props,
        className: _.upperFirst(_.camelCase(this.props.name)),
        id: _.camelCase(this.props.name)
      }
    );
  }

});
