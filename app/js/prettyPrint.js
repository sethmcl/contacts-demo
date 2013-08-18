(function (namespace) {

  // Export to namespace
  namespace.prettyPrint = {

    /**
     * Format JSON string
     * @param {string} json the json string
     */
    json: function (json) {
      var indent = 1, tabWidth = 2;

      function getTabs (count) {
        var i, tabs = '', total = count * tabWidth;

        for (i = 0; i < total; i++) {
          tabs += ' ';
        }

        return tabs;
      };

      return json.replace(/^\{/g, '{\n  ')
                 .replace(/:\S/g, function (match) {
                    return match.substr(0, 1) + ' ' + match.substr(1);
                 })
                 .replace(/(: \{)|(,\")|(\S})|(}+)/g, function (match) {
                    var retVal = match;

                    if (match === ': {') {
                      retVal = ': {\n' + getTabs(++indent);
                    } else if (match === ',"') {
                      retVal = ',\n' + getTabs(indent) + '"';
                    } else if (match.substr(0, 2) === '}}') {
                      var braces = match.split('}');

                      braces.forEach(function (item, index) {
                        braces[index] = '\n' + getTabs(--indent);
                      });

                      retVal = braces.join('}');
                    } else {
                      retVal = match.substr(0, 1) + '\n' + getTabs(--indent) + match.substr(1);
                    }

                    return retVal;
                 });

    }
  };

}(window.JCT || (window.JCT = {})));
