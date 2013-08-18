(function (namespace) {
  namespace.Pages = namespace.Pages || {};
  namespace.Pages['contacts-list'] = ContactsList;

  /**
   * Renders view of contact list
   * @param {HTMLElement} el the root element for this page
   * @param {Model} model the data model for this page
   */
  function ContactsList(el, model) {
    namespace.Page.apply(this, arguments);

    this.listEl = el.querySelector('ul.list');
    this.addEl = el.querySelector('[data-action=add-contact]');
    this.contactTemplate = namespace.template.compile(el.querySelector('#contact-list-item').innerHTML);

    this.events = [
      [this.addEl, 'click', this.didClickAddContact, this],
      ['.contact-list-item input', 'keyup', this.didCommitContactEdit, this],
      ['.contact-list-item [data-action=delete]', 'click', this.didClickDeleteContact, this],
      ['.contact-list-item [data-action=edit]', 'click', this.didClickEditContact, this],
      ['.contact-list-item [data-action=save]', 'click', this.didClickSaveContact, this],
    ];

    this.model.on('change', this.render, this);
  }

  // Inherit from base Page
  ContactsList.prototype = Object.create(namespace.Page.prototype);
  ContactsList.prototype.constructor = ContactsList;

  /**
   * Render the page
   */
  ContactsList.prototype.render = function () {
    var contacts = this.model.get('contacts');

    // Clear list
    this.listEl.innerHTML = '';

    // Should probably sanitize this data to prevent XSS
    Object.keys(contacts).forEach(function (key) {
      var contact = contacts[key];
      this.renderContact(contact);
    }, this);

  };

  /**
   * Render new contact
   */
  ContactsList.prototype.renderContact = function (contact) {
    var contactEl = this.contactTemplate(contact);
    this.listEl.appendChild(contactEl);
    return contactEl;
  };

  /**
   * Handle click on add contact
   * @param {event} e event object
   */
  ContactsList.prototype.didClickAddContact = function (e) {
    app.track('click-add-contact');
    this.addNewContact();
  };

  /**
   * Add a new contact to list
   */
  ContactsList.prototype.addNewContact = function () {
    var el = this.renderContact({});
    this.editContact(el);
  };

  /**
   * Start editing a contact element
   */
  ContactsList.prototype.editContact = function (el) {
    el.classList.add('edit');
    el.querySelector('.first-name').focus();
  };

  /**
   * Handle key up event to commit changes to contact
   * @param {event} e event object
   */
  ContactsList.prototype.didCommitContactEdit = function (e) {
    var contactEl;

    // only respond to enter
    if (e.keyCode !== 13) {
      return;
    }

    contactEl = this.ancestorSelector(e.target, 'contact-list-item');
    this.saveContact(contactEl);
    app.track('save-contact', 'enter');
  };

  /**
   * Handle clicking save button for a contact
   * @param {event} e event object
   */
  ContactsList.prototype.didClickSaveContact = function (e) {
    var contactEl;

    contactEl = this.ancestorSelector(e.target, 'contact-list-item');
    this.saveContact(contactEl);
    app.track('save-contact', 'button');
  };

  /**
   * Handle clicking edit button for a contact
   * @param {event} e event object
   */
  ContactsList.prototype.didClickEditContact = function (e) {
    var contactEl;

    contactEl = this.ancestorSelector(e.target, 'contact-list-item');
    this.editContact(contactEl);
  };

  /**
   * Handle clicking delete button for a contact
   * @param {event} e event object
   */
  ContactsList.prototype.didClickDeleteContact = function (e) {
    var contactEl;

    contactEl = this.ancestorSelector(e.target, 'contact-list-item');
    this.deleteContact(contactEl);
  };

  /**
   * Save changes to a contact
   * @param {HTMLElement} el the contact element
   */
  ContactsList.prototype.saveContact = function (el) {
    var id          = el.getAttribute('data-id'),
        firstName   = el.querySelector('input.first-name').value,
        lastName    = el.querySelector('input.last-name').value,
        phoneNumber = el.querySelector('input.phone-number').value;

    if (!id) {
      this.model.addContact(firstName, lastName, phoneNumber);
      app.info('Saved new contact');
    } else {
      this.model.updateContact(id, firstName, lastName, phoneNumber);
      app.info('Updated contact');
    }
  };

  /**
   * Delete a contact
   * @param {HTMLElement} el the contact element
   */
  ContactsList.prototype.deleteContact = function (el) {
    var id  = el.getAttribute('data-id');

    if (id) {
      this.model.deleteContact(id);
      app.info('Deleted contact');
    } else {
      this.render();
    }
  };

}(window.JCT || (window.JCT = {})));
