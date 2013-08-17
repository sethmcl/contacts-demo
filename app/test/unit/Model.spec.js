/**
 * @venus-library mocha
 * @venus-include ../../js/Events.js
 * @venus-code ../../js/Model.js
 */

describe('Model', function () {
  var model, spy;

  beforeEach(function () {
    model = new JCT.Model();
    spy   = sinon.spy();
  });

  it('should store data', function () {
    var value;

    model.set('name', 'Seth');
    value = model.get('name');

    expect(value).to.be('Seth');
  });

  it('should fire global change event', function () {
    model.set('job', 'Engineer');
    model.on('change', spy);
    model.set('name', 'Seth');

    expect(spy.calledWith({job: 'Engineer', name: 'Seth'})).to.be.ok();
    expect(spy.callCount).to.be(1);
  });

  it('should fire local change event', function () {
    model.set('job', 'Engineer');
    model.on('change:name', spy);
    model.set('name', 'Seth');

    expect(spy.calledWith('Seth')).to.be.ok();
    expect(spy.callCount).to.be(1);

  });
});
