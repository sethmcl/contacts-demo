(function (namespace) {
  namespace.Pages = namespace.Pages || {};
  namespace.Pages['metrics'] = Metrics;

  function Metrics() {
    namespace.Page.apply(this, arguments);
  }

  Metrics.prototype = Object.create(namespace.Page.prototype);
  Metrics.prototype.constructor = Metrics;

  Metrics.prototype.load = function () {
    this.el.classList.add('active');
  };

  Metrics.prototype.unload = function () {
    this.el.classList.remove('active');
  };

}(window.JCT || (window.JCT = {})));
