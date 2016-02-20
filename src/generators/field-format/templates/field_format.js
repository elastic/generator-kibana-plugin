import fieldFormatRegistry from 'ui/registry/field_formats';
import FieldFormat from 'ui/index_patterns/_field_format/FieldFormat';
import _ from 'lodash';

fieldFormatRegistry.register((Private) => {
  _.class(<%= className %>).inherits(Private(FieldFormat));
  function <%= className %>(params) {
    <%= className %>.Super.call(this, params);
  }

  <%= className %>.id = '<%= id %>';
  <%= className %>.title = '<%= name %>';

  <%= className %>.fieldType = <%- JSON.stringify(fieldTypes) %>;

  <%= className %>.prototype._convert = {
    text: function (value) {
      // This method must return a textual representation of the value (no HTML).
      return value;
    },
    html: function (value) {
      // This method can return HTML to represent the value.
      return value;
    }
  };

  return <%= className %>;
});
