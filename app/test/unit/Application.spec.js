/**
 * @venus-library mocha
 * @venus-code ../../js/application.js
 * @venus-fixture application.fixture.html
 */

describe('Application', function () {
  var app;

  beforeEach(function () {
    app = new JCT.Application();
  });

  describe('initPages', function () {
    var pages;

    it('should parse valid page elements', function () {
      pages = app.initPages(document.getElementById('valid-page-set'));
      expect(Object.keys(pages).length).to.be(3);
    });

    it('should throw exception on duplicate page elements', function () {
      var error;

      try {
        app.initPages(document.getElementById('dupe-page-set'));
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an(Error);
    });
  });

  describe('instantiatePage', function () {
    var el;

    before(function () {
      window.JCT.Pages = {
        foo: sinon.spy()
      };

      el = document.querySelector('[data-page=foo]');
      app.instantiatePage('foo', el);
    });

    it('should instantiate the correct page object', function () {
      expect(window.JCT.Pages.foo.callCount).to.be(1);
    });

    it('should pass the correct element to page constructor', function () {
      expect(window.JCT.Pages.foo.calledWith(el)).to.be(true);
    });

    it('should throw an error if page constructor does not exist', function () {
      var error;

      try {
        app.instantiatePage('boent', el);
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an(Error);
    });
  });

  describe('loadPage', function () {
    var activePage;

    beforeEach(function () {
      activePage = {
        unload: sinon.spy()
      };

      app.activePage = activePage;
      app.pages = app.initPages(document.getElementById('valid-page-set'));
      app.instantiatePage = sinon.spy({
        instantiatePage: function () {
          return {
            load: sinon.spy()
          }
        }
      }, 'instantiatePage');
    });

    it('should unload active page', function  () {
      app.loadPage('foo');
      expect(activePage.unload.callCount).to.be(1);
    });

    it('should instantiate the page if it has not been instantiated', function () {
      app.loadPage('foo');
      expect(app.instantiatePage.callCount).to.be(1);
    });

    it('should call load on the page', function () {
      app.loadPage('foo');
      expect(app.pages['foo'].load.callCount).to.be(1);
    });

    it('should throw an error if page key is invalid', function () {
      var error;

      try {
        app.loadPage('invalid-page-key');
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an(Error);
    });


  });

});
