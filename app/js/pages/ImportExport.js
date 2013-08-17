(function (namespace) {
  namespace.Pages = namespace.Pages || {};
  namespace.Pages['import-export'] = ImportExport;

  function ImportExport() {
    namespace.Page.apply(this, arguments);
  }

  ImportExport.prototype = Object.create(namespace.Page.prototype);
  ImportExport.prototype.constructor = ImportExport;

  ImportExport.prototype.load = function () {
    this.el.classList.add('active');
  };

  ImportExport.prototype.unload = function () {
    this.el.classList.remove('active');
  };

}(window.JCT || (window.JCT = {})));
