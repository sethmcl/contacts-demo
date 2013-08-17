(function (namespace) {

  // Export to namespace
  namespace.Template = {

    /**
     * Compile a template
     * @param {string} markup the template markup
     */
    compile: function (markup) {
      return function (data) {
        var html, div;

        div = document.createElement('div');
        div.innerHTML = markup.replace(/{(\w*)}/g, function (match, capture) {
          return data[capture] || '';
        });

        return div.children[0];
      }
    }
  };

}(window.JCT || (window.JCT = {})));
