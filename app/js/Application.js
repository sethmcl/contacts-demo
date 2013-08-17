(function (namespace) {

  // Export to namespace
  namespace.Application = Application;

  /**
   * Core Application object, acts as controller for loading pages
   */
  function Application() {}

  /**
   * Initialize the application
   */
  Application.prototype.init = function () {
    this.pages  = this.initPages(document);
    this.router = new namespace.Router();
    this.model  = new namespace.Models.Contacts();

    document.addEventListener('click', this.didAnchorClick.bind(this));

    // Configure routes
    this.router
        .addRoute('/', function () {
          this.loadPage('contacts-list');
        }.bind(this))
        .addRoute('/contacts-list', function () {
          this.loadPage('contacts-list');
        }.bind(this))
        .addRoute('/import-export', function () {
          this.loadPage('import-export');
        }.bind(this))
        .addRoute('/metrics', function () {
          this.loadPage('metrics');
        }.bind(this));

  };

  /**
   * Intercept clicks on anchor elements
   * @param {event} e the click event
   */
  Application.prototype.didAnchorClick = function (e) {
    var target = e.target;

    if (target.tagName !== 'A' || target.getAttribute('data-local-link').toUpperCase() === 'FALSE') {
      return;
    }

    this.router.setUrl(target.href);
    e.preventDefault();
  };

  /**
   * Parse given DOM element for page elements and returns hash of pages.
   * Would generally call this with the document object.
   * @param {HtmlElement} el the element to parse
   * @returns {Object} object with page keys mapping to DOM elements
   */
  Application.prototype.initPages = function (el) {
    var pages = {};

    Array.prototype.slice.call(el.querySelectorAll('[data-page]'), 0).forEach(function (el) {
      var pageKey = el.getAttribute('data-page');

      if (pages[pageKey]) {
        throw new Error('Duplicate page name: ' + pageKey + '. Page names must be unique.');
      }

      pages[pageKey] = el;
    });

    return pages;
  };

  /**
   * Load a page. Unloads currently active page first, if any.
   * @param {string} pageKey the page key for the page to load
   */
  Application.prototype.loadPage = function (pageKey) {
    var page = this.pages[pageKey];

    // unload current page
    if (this.activePage) {
      this.activePage.unload();
    }

    // If we didn't get anything associated with this page key,
    // then throw an error
    if (!page) {
      throw new Error('Page "' + pageKey + '" does not exist in DOM.');
    }

    // If the page object in an HTMLElement, then that means we have not constructed
    // the page object yet. So we'll go ahead and do that.
    if (page instanceof HTMLElement) {
      this.pages[pageKey] = page = this.instantiatePage(pageKey, page);
    }

    page.load();

    this.activePage = page;
  };

  /**
   * Construct a new page object with the given page key
   * @param {string} pageKey the page key that maps to a constructor function
   * @param {HtmlElement} el the root element for the page, passed to the constructor
   * @returns {Page} an instance of the desired page
   */
  Application.prototype.instantiatePage = function (pageKey, el) {
    var PageConstructor = namespace.Pages[pageKey];

    if (typeof PageConstructor !== 'function') {
      throw new Error('Constructor function for page ' + pageKey + ' is not loaded.');
    }

    return new PageConstructor(el, this.model);
  };


}(window.JCT || (window.JCT = {})));
