(function (namespace) {
  namespace.Pages = namespace.Pages || {};
  namespace.Pages['metrics'] = Metrics;

  /**
   * Renders view of metrics (user action tracking events)
   * @param {HTMLElement} el the root element for this page
   * @param {Model} model the data model for this page
   */
  function Metrics(el, model) {
    namespace.Page.apply(this, arguments);

    this.listEl = el.querySelector('ul.list');
    this.eventTemplate = namespace.template.compile(el.querySelector('#tracking-event-list-item').innerHTML);
    this.model.on('change:tracking', this.render, this);
  }

  // Inherit from base Page
  Metrics.prototype = Object.create(namespace.Page.prototype);
  Metrics.prototype.constructor = Metrics;

  /**
   * Render the page
   */
  Metrics.prototype.render = function () {
    var trackingEvents = this.model.get('tracking');

    // Clear list
    this.listEl.innerHTML = '';

    Object.keys(trackingEvents).forEach(function (key) {
      var trackingEvent = trackingEvents[key];
      this.renderEvent(trackingEvent);
    }, this);

  };

  /**
   * Render new tracking event
   * @param {object} trackingEvent event data
   */
  Metrics.prototype.renderEvent = function (trackingEvent) {
    var eventEl = this.eventTemplate(trackingEvent);
    this.listEl.appendChild(eventEl);
    return eventEl;
  };

}(window.JCT || (window.JCT = {})));
