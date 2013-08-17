(function (namespace) {

  // Export to namespace
  namespace.Page = Page;

  /**
   * Create a new page (view)
   * @param {HTMLElement} el the page element
   * @param {Model} model data model for page
   */
  function Page(el, model) {
    this.el                  = el;
    this.model               = model;
    this.events              = [];
    this.delegateClickEvents = this.delegateEvents('click').bind(this);
    this.delegateKeyEvents   = this.delegateEvents('keyup').bind(this);
  }

  /**
   * Load the page by showing it and binding events
   */
  Page.prototype.load = function () {
    this.el.classList.add('active');
    this.render();
    this.bindEvents();
  };

  /**
   * Unload the page by hiding it and unbinding events
   */
  Page.prototype.unload = function () {
    this.el.classList.remove('active');
    this.unbindEvents();
  };

  /**
   * Render the page
   * @abstract
   */
  Page.prototype.render = function () {
    throw new Error('Page.render method must be overriden');
  };

  /**
   * Bind DOM events
   */
  Page.prototype.bindEvents = function () {
    this.el.addEventListener('click', this.delegateClickEvents);
    this.el.addEventListener('keyup', this.delegateKeyEvents);
  };

  /**
   * Unbind DOM events
   */
  Page.prototype.unbindEvents = function () {
    this.el.removeEventListener('click', this.delegateClickEvents);
    this.el.removeEventListener('keyup', this.delegateKeyEvents);
  };

  /**
   * Delegate click events
   * @param {string} desiredEventType event type
   */
  Page.prototype.delegateEvents = function (desiredEventType) {

    function matchSelector(selector, target) {
      var elements = Array.prototype.slice.call(this.el.querySelectorAll(selector), 0);

      return (elements.indexOf(target) !== -1);
    }

    return function (e) {
      var target = e.target;

      this.events.forEach(function (evt) {
        var el           = evt[0],
            type         = evt[1],
            eventHandler = evt[2],
            context      = evt[3],
            match        = false;

        if (type !== desiredEventType) {
          return;
        }

        if (typeof el === 'string') {
          match = matchSelector.call(this, el, target);
        } else {
          match = (target === el);
        }

        if (match) {
          eventHandler.call(context, e);
        }
      }, this);
    };

  };

  /**
   * Helper function to select ancestor
   * @param {HTMLElement} el the element who's ancestor you want
   * @param {string} className the class name which the ancestor must have
   */
  Page.prototype.ancestorSelector = function (el, className) {
    var match, stop = false, inspect = el;

    while (inspect.parentNode && !match) {
      inspect = inspect.parentNode;
      if (inspect.classList.contains(className)) {
        match = inspect;
        break;
      }
    }

    return match;
  };


}(window.JCT || (window.JCT = {})));
