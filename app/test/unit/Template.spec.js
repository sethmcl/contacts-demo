/**
 * @venus-library mocha
 * @venus-code ../../js/template.js
 * @venus-fixture template.fixture.html
 */

describe('template', function () {

  it('should render correctly', function () {
    var tmpl = JCT.template.compile(document.getElementById('template').innerHTML);

    expect(tmpl({name: 'Seth', weather: 'rain'}).innerHTML).to.be('Hi Seth! Looks like it might rain today!');
  });

});
