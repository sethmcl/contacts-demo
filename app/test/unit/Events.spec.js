/**
 * @venus-library mocha
 * @venus-code ../../js/Events.js
 */

describe('Events', function () {
  var events, loadHandler1, loadHandler2, unloadHandler1;

  beforeEach(function () {
    events         = new JCT.Events();
    loadHandler1   = sinon.spy();
    loadHandler2   = sinon.spy();
    unloadHandler1 = sinon.spy();
  });

  describe('attach events', function () {

    it('should attach and fire event', function () {
      events.on('load', loadHandler1);
      events.fire('load');
      expect(loadHandler1.callCount).to.be(1);
    });

  });

  describe('remove events', function () {

    it('should remove a single event handler', function () {
      events.on('load', loadHandler1);
      events.on('load', loadHandler1);
      events.on('load', loadHandler2);
      events.off('load', loadHandler1);
      events.fire('load');

      expect(loadHandler1.callCount).to.be(0);
      expect(loadHandler2.callCount).to.be(1);
    });

    it('should remove all event handlers for an event', function () {
      events.on('load', loadHandler1);
      events.on('load', loadHandler2);
      events.off('load');
      events.fire('load');

      expect(loadHandler1.callCount).to.be(0);
      expect(loadHandler2.callCount).to.be(0);
    });

    it('should remove all event handlers for all events', function () {
      events.on('load', loadHandler1);
      events.on('load', loadHandler2);
      events.on('unload', unloadHandler1);
      events.off();
      events.fire('unload');
      events.fire('load');

      expect(loadHandler1.callCount).to.be(0);
      expect(loadHandler2.callCount).to.be(0);
      expect(unloadHandler1.callCount).to.be(0);
    });
  });
});
