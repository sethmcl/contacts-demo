/**
 * @venus-library mocha
 * @venus-code ../../js/Template.js
 * @venus-fixture Template.fixture.html
 */

describe('Template', function () {

  it('should render correctly', function () {
    var tmpl = JCT.Template.compile(document.getElementById('template').innerHTML);

    expect(tmpl({name: 'Seth', weather: 'rain'}).innerHTML).to.be('Hi Seth! Looks like it might rain today!');
  });

});
