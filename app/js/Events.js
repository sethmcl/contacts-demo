(function (namespace) {
  namespace.Events = Events;

  /**
   * Provide eventing functionality
   */
  function Events() {
    this.store = {};
  }

  /**
   * Attach an event listener
   * @param {string} eventName the event
   * @param {function} handler the handler function to be called
   * @param {object} context the context to call the handler function with
   * @returns {Events} this for chaining
   */
  Events.prototype.on = function (eventName, handler, context) {
    var eventHandlers = this.store[eventName];

    if (!Array.isArray(eventHandlers)) {
      this.store[eventName] = eventHandlers = [];
    }

    eventHandlers.push({
      fn: handler,
      ctx: context
    });

    return this;
  };

  /**
   * Remove an event listener.
   * If no handler function is provided, all handlers for given event are removed.
   * If no eventName is provided, all handlers for all events are removed.
   *
   * @param {string} [eventName] the event
   * @param {function} [handler] the handler function to be removed
   * @returns {Events} this for chaining
   */
  Events.prototype.off = function (eventName, handler) {
    var eventHandlers, index;

    if (!eventName) {
      this.store = {};
      return this;
    }

    eventHandlers = this.store[eventName];

    if (!handler) {
      eventHandlers.length = 0;
      return this;
    }

    this.store[eventName] = eventHandlers.filter(function (eventHandler) {
      return !(eventHandler.fn === handler);
    });

    return this;
  };

  /**
   * Fire an event
   * @param {string} argument[0] the event
   * @param {...*} argument[1] arguments to pass to the event handler
   * @returns {Events} this for chaining
   */
  Events.prototype.fire = function () {
    var eventName = arguments[0],
        eventArgs = Array.prototype.slice.call(arguments, 1),
        eventHandlers = this.store[eventName];

    if (!Array.isArray(eventHandlers)) {
      return this;
    }

    eventHandlers.forEach(function (handler) {
      handler.fn.apply(handler.ctx, eventArgs);
    });

    return this;
  };

}(window.JCT || (window.JCT = {})));
