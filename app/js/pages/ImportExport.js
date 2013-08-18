(function (namespace) {
  namespace.Pages = namespace.Pages || {};
  namespace.Pages['import-export'] = ImportExport;

  /**
   * Controls page which allows you to import and export the contact list
   * @param {HTMLElement} el the root element for this page
   * @param {Model} model the data model for this page
   */
  function ImportExport(el, model) {
    namespace.Page.apply(this, arguments);

    this.jsonEl = el.querySelector('#json-serialized');

    this.events = [
      ['[data-action=import]', 'click', this.didClickImport, this]
    ];

    model.on('change', this.updateJson, this);
    this.updateJson();
  }

  // Inherit frome base Page
  ImportExport.prototype = Object.create(namespace.Page.prototype);
  ImportExport.prototype.constructor = ImportExport;

  /**
   * Render the page
   */
  ImportExport.prototype.render = function () {
    // No templates in use on this page
  };

  /**
   * Update JSON
   */
  ImportExport.prototype.updateJson = function () {
    this.jsonEl.value = JCT.prettyPrint.json(this.model.json('contacts'));
  };

  /**
   * Import JSON
   */
  ImportExport.prototype.importJson = function () {
    var json = this.jsonEl.value;

    try {
      this.model.data.contacts = JSON.parse(json);
      this.model.persist();
      this.model.fire('change');
      app.track('json-import', 'success');
    } catch (e) {
      app.error('Invalid JSON');
      app.track('json-import', 'error');
    }
  };

  /**
   * Handle click on import button
   * @param {event} e DOM event object
   */
  ImportExport.prototype.didClickImport = function (e) {
    this.importJson();
  };


}(window.JCT || (window.JCT = {})));
