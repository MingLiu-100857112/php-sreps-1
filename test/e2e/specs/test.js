module.exports = {

  before: function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#app', 5000)
      .click('#record-table button').pause(2000)
  },

  'initial startup test': function(browser) {
    browser
      .assert.title('php-sreps')
      .assert.elementPresent('#app')
      .assert.elementPresent('#record-form form')
      .assert.elementPresent('#record-form fieldset')
      .assert.containsText('#record-form legend', 'Enter new record')
      .assert.containsText('#record-form label[for="title"]', 'Title')
      .assert.containsText('#record-form label[for="quantity"]', 'Quantity')
      .assert.containsText('#record-form label[for="date"]', 'Date')
      .assert.attributeEquals('#record-form input[name="title"]', 'placeholder', 'Title')
      .assert.attributeEquals('#record-form input[name="quantity"]', 'placeholder', 'Quantity')
      .assert.attributeEquals('#record-form input[name="date"]', 'placeholder', 'Date')
      .assert.value('#record-form input[name="title"]', '')
      .assert.value('#record-form input[name="quantity"]', '')
      .assert.value('#record-form input[name="date"]', '')
      .assert.containsText('#record-form button', 'ADD RECORD')
      .assert.elementPresent('#record-table table')
      .assert.elementPresent('#record-table thead')
      .assert.elementPresent('#record-table tr')
      .assert.containsText('#record-table th:nth-of-type(1n)', 'IDENTIFIER')
      .assert.containsText('#record-table th:nth-of-type(2n)', 'TITLE')
      .assert.containsText('#record-table th:nth-of-type(3n)', 'QUANTITY')
      .assert.containsText('#record-table th:nth-of-type(4n)', 'DATE')
      .assert.elementPresent('#record-table button')
      .assert.elementPresent('#record-table tbody')
  },

  'add record test': function(browser) {
    browser
      .setValue('#record-form input[name="title"]', 'A')
      .setValue('#record-form input[name="quantity"]', '5')
      .setValue('#record-form input[name="date"]', '3/21/2000')
      .click('#record-form button').pause(2000)
      .assert.value('#record-form input[name="title"]', '')
      .assert.value('#record-form input[name="quantity"]', '')
      .assert.value('#record-form input[name="date"]', '')
  },

  'display record test': function(browser) {
    browser
      .assert.elementPresent('#record-row')
      .assert.containsText('#record-row td:nth-of-type(1n)', '')
      .assert.containsText('#record-row td:nth-of-type(2n)', 'A')
      .assert.containsText('#record-row td:nth-of-type(3n)', '5')
      .assert.containsText('#record-row td:nth-of-type(4n)', new Date('3/21/2000').toDateString())
      .assert.containsText('#record-row button.secondary', 'EDIT')
      .assert.containsText('#record-row button.danger', 'REMOVE')
  },

  'edit record success test': function(browser) {
    browser
      .click('#record-row button.secondary').pause(2000)
      .assert.containsText('#record-row td:nth-of-type(1n)', '')
      .assert.value('#record-row input[name="title"]', 'A')
      .assert.value('#record-row input[name="quantity"]', '5')
      .assert.value('#record-row input[name="date"]', new Date('3/21/2000').toString())
      .assert.containsText('#record-row button.primary', 'SAVE')
      .assert.containsText('#record-row button.default', 'CANCEL')
      .clearValue('#record-row input[name="title"]')
      .setValue('#record-row input[name="title"]', 'B')
      .click('#record-table').pause(2000)
      .clearValue('#record-row input[name="quantity"]')
      .setValue('#record-row input[name="quantity"]', '7')
      .click('#record-table').pause(2000)
      .clearValue('#record-row input[name="date"]')
      .setValue('#record-row input[name="date"]', '11/11/2011')
      .click('#record-row button.primary').pause(2000)
      .assert.containsText('#record-row td:nth-of-type(1n)', '')
      .assert.containsText('#record-row td:nth-of-type(2n)', 'B')
      .assert.containsText('#record-row td:nth-of-type(3n)', '7')
      .assert.containsText('#record-row td:nth-of-type(4n)', new Date('11/11/2011').toDateString())
      .assert.containsText('#record-row button.secondary', 'EDIT')
      .assert.containsText('#record-row button.danger', 'REMOVE')
  },

  'edit record failure test': function(browser) {
    browser
      .click('#record-row button.secondary').pause(2000)
      .assert.containsText('#record-row td:nth-of-type(1n)', '')
      .assert.value('#record-row input[name="title"]', 'B')
      .assert.value('#record-row input[name="quantity"]', '7')
      .assert.value('#record-row input[name="date"]', new Date('11/11/2011').toString())
      .assert.containsText('#record-row button.primary', 'SAVE')
      .assert.containsText('#record-row button.default', 'CANCEL')
      .clearValue('#record-row input[name="title"]')
      .setValue('#record-row input[name="title"]', 'C')
      .click('#record-table').pause(2000)
      .clearValue('#record-row input[name="quantity"]')
      .setValue('#record-row input[name="quantity"]', '9')
      .click('#record-table').pause(2000)
      .clearValue('#record-row input[name="date"]')
      .setValue('#record-row input[name="date"]', '2/2/2022')
      .click('#record-row button.default').pause(2000)
      .assert.containsText('#record-row td:nth-of-type(1n)', '')
      .assert.containsText('#record-row td:nth-of-type(2n)', 'B')
      .assert.containsText('#record-row td:nth-of-type(3n)', '7')
      .assert.containsText('#record-row td:nth-of-type(4n)', new Date('11/11/2011').toDateString())
      .assert.containsText('#record-row button.secondary', 'EDIT')
      .assert.containsText('#record-row button.danger', 'REMOVE')
  },

  'remove record test': function(browser) {
    browser
      .click('#record-row button.danger').pause(2000)
      .assert.elementNotPresent('#record-row')
  },

  after: function(browser) {
    browser
      .end()
  }
}
