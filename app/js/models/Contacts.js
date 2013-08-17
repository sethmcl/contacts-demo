(function (namespace) {
  namespace.Models = namespace.Models || {};
  namespace.Models.Contacts = Contacts;

  /**
   * Data model for contacts application
   */
  function Contacts() {
    namespace.Model.call(this, 'contactsData');
    this.data.contacts = this.data.contacts || {
      1: {id: 1, firstName: 'Seth', lastName: 'McLaughlin', phoneNumber: '(123) 343 - 3492'},
      2: {id: 2, firstName: 'Santa', lastName: 'Claus', phoneNumber: '(123) 922 - 3492'}
    };

    this.nextContactId = this.getNextContactId();
  }

  // Inherit from Model
  Contacts.prototype = Object.create(namespace.Model.prototype);
  Contacts.prototype.constructor = Contacts;

  /**
   * Get next available contact id
   */
  Contacts.prototype.getNextContactId = function () {
    var max = 0;

    Object.keys(this.data.contacts).forEach(function (key) {
      max = Math.max(key, max);
    });

    return max + 1;
  };

  /**
   * Add a new contact
   * @param {string} firstName contact's first name
   * @param {string} lastName contact's last name
   * @param {string} phoneNumber contact's phone number
   */
  Contacts.prototype.addContact = function (firstName, lastName, phoneNumber) {
    var id = this.nextContactId++;

    this.data.contacts[id] = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    };

    this.persist();
    this.fire('change', this.data);
  };

  /**
   * Update contact
   * @param {number} id contact's id
   * @param {string} firstName contact's first name
   * @param {string} lastName contact's last name
   * @param {string} phoneNumber contact's phone number
   */
  Contacts.prototype.updateContact = function (id, firstName, lastName, phoneNumber) {

    this.data.contacts[id] = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    };

    this.persist();
    this.fire('change', this.data);
  };

  /**
   * Delete a contact
   * @param {number} id contact's id
   */
  Contacts.prototype.deleteContact = function (id, firstName, lastName, phoneNumber) {
    delete this.data.contacts[id];

    this.persist();
    this.fire('change', this.data);
  };

}(window.JCT || (window.JCT = {})));
