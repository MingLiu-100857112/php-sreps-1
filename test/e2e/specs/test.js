module.exports = {

  before: function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#app', 5000)
  },

  'initial startup tests': function(browser) {
    browser
      .assert.elementPresent('#app')
      .assert.elementPresent('.record-form form')
      .assert.elementPresent('.record-form fieldset')
      .assert.containsText('.record-form legend', 'Enter new record')
      .assert.containsText('.record-form label[for="title"]', 'Title')
      .assert.containsText('.record-form label[for="quantity"]', 'Quantity')
      .assert.containsText('.record-form label[for="date"]', 'Date')
      .assert.attributeEquals('.record-form input[name="title"]', 'placeholder', 'Title')
      .assert.attributeEquals('.record-form input[name="quantity"]', 'placeholder', 'Quantity')
      .assert.attributeEquals('.record-form input[name="date"]', 'placeholder', 'Date')
      .assert.containsText('.record-form button', 'ADD RECORD')
      .assert.elementPresent('.record-table table')
      .assert.elementPresent('.record-table thead')
      .assert.elementPresent('.record-table tr')
      .assert.containsText('.record-table th:nth-of-type(1n)', 'IDENTIFIER')
      .assert.containsText('.record-table th:nth-of-type(2n)', 'TITLE')
      .assert.containsText('.record-table th:nth-of-type(3n)', 'QUANTITY')
      .assert.containsText('.record-table th:nth-of-type(4n)', 'DATE')
      .assert.elementPresent('.record-table tbody')
  },

  after: function(browser) {
    browser
      .end()
  }
}
