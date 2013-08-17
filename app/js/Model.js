(function (namespace) {

  // Export to namespace
  namespace.Model = Model;

  /**
   * Create a new model
   * @param {string} localStorageKey key to store data in local storage
   */
  function Model(localStorageKey) {
    namespace.Events.call(this);
    this.localStorageKey = localStorageKey;
    this.data = this.load();
  }

  // Inherit from Events
  Model.prototype = Object.create(namespace.Events.prototype);
  Model.prototype.constructor = Model;

  /**
   * Get a value from model
   * @param {string} key model key
   * @returns {*} the value
   */
  Model.prototype.get = function (key) {
    return this.data[key];
  };

  /**
   * Set a value on the model
   * @param {string} key model key
   * @param {*} value model value
   * @returns {Model} this for chaining
   */
  Model.prototype.set = function (key, value) {
    this.data[key] = value;

    // probably shouldn't do this on every change, but seems ok for small app
    this.persist();

    this.fire('change', this.data);
    this.fire('change:'+key, value);

    return this;
  };

  /**
   * Load data from local storage
   * @returns data
   */
  Model.prototype.load = function () {
    var data;

    try {
      data = JSON.parse(window.localStorage[this.localStorageKey]);
    } catch (e) {
      data = {};
    }

    return data;
  };

  /**
   * Persist data to local storage
   */
  Model.prototype.persist = function () {

    try {
      window.localStorage[this.localStorageKey] = JSON.stringify(this.data);
    } catch (e) {
      // unable to persist data
    }

  };

}(window.JCT || (window.JCT = {})));
