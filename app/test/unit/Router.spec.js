/**
 * @venus-library mocha
 * @venus-code ../../js/Router.js
 */

describe('Router', function () {
  var router;

  beforeEach(function (done) {
    if (router) {
      router.destroy();
      console.log('destroying router');
    }

    setTimeout(function () {
      router = new JCT.Router();
      done();
    }, 100);
  });

  describe('addRoute', function () {

    it('should add a new route', function () {
      var routeHandler = sinon.spy();
      router.addRoute('/sample', routeHandler);
      router.fireRoute('/sample');
      expect(routeHandler.callCount).to.be(1);
    });
  });

  describe('fireRoute', function () {

    it('should throw error for invalid routes', function () {
      var error;

      try {
        router.fireRoute('/invalid');
      } catch (e) {
        error = e;
      }

      expect(error).to.be.an(Error);
    });
  });

  describe('navigation', function () {

    it('should call correct handler on navigation', function (done) {
      var routeHandler = sinon.spy();
      router.addRoute('/home', routeHandler);
      router.addRoute('/about', sinon.spy());
      router.setUrl('/home');
      router.setUrl('/about');
      history.back();

      setTimeout(function () {
        expect(routeHandler.callCount).to.be(2);
        done();
      }, 100);
    });

  });
});
