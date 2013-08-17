(function (namespace) {

  // Export to namespace
  namespace.Router = Router;

  /**
   * Handle page routing via the history API
   */
  function Router() {
    this.routes = {};
    this.base = [window.location.protocol, '//', window.location.host].join('');
    this.stateChangeHandler = this.didStateChange.bind(this);
    window.addEventListener('popstate', this.stateChangeHandler);
  }

  /**
   * Destroy the router and unbind from the popstate event
   */
  Router.prototype.destroy = function () {
    window.removeEventListener('popstate', this.stateChangeHandler);
  };

  /**
   * Handle popstate event
   * @param {event} e the popstate event object
   */
  Router.prototype.didStateChange = function (e) {
    this.fireRoute(location.pathname);
  };

  /**
   * Update the current URL state
   * @param {string} url the url
   */
  Router.prototype.setUrl = function (url) {
    url = url.replace(this.base, '');
    history.pushState(null, null, url);
    this.fireRoute(url);
  };

  /**
   * Add a new route handler
   * @param {string} pattern route pattern
   * @param {function} handler route handler function
   */
  Router.prototype.addRoute = function (pattern, handler) {
    this.routes[pattern] = handler;
    return this;
  };

  /**
   * Fire a route handler
   * @param {string} pattern route to fire
   */
  Router.prototype.fireRoute = function (pattern) {
    var handler = this.routes[pattern];

    if (typeof handler === 'function') {
      handler();
    } else {
      throw new Error('Route ' + pattern + ' is undefined');
    }

    return this;
  };

}(window.JCT || (window.JCT = {})));
