module.exports = {

  before: function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#app', 5000)
  },

  'initial startup tests': function(browser) {
    browser
      .assert.elementPresent('#app')
      .assert.cssClassPresent('#app', 'uk-grid-small')
      .assert.attributeEquals('#app', 'uk-grid', 'uk-grid')
  },

  'element present tests': function(browser) {
    browser
      .assert.elementPresent('form#record-form')
      .assert.elementPresent('fieldset#record-form-fieldSet')
      .assert.elementPresent('legend#record-form-legend')
      .assert.elementPresent('label#record-form-label-title')
      .assert.elementPresent('label#record-form-label-quantity')
      .assert.elementPresent('label#record-form-label-date')
  },

  'css class tests': function(browser) {
    browser
      .assert.cssClassPresent('form#record-form', 'uk-form-stacked')
      .assert.cssClassPresent('fieldset#record-form-fieldSet', 'uk-fieldset')
      .assert.cssClassPresent('legend#record-form-legend', 'uk-legend')
      .assert.cssClassPresent('label#record-form-label-title', 'uk-form-label')
      .assert.cssClassPresent('label#record-form-label-quantity', 'uk-form-label')
      .assert.cssClassPresent('label#record-form-label-date', 'uk-form-label')
  },

  'text content tests:': function(browser) {
    browser
      .assert.containsText('legend#record-form-legend', 'Enter new record')
      .assert.containsText('label#record-form-label-title', 'Title')
      .assert.containsText('label#record-form-label-quantity', 'Quantity')
      .assert.containsText('label#record-form-label-date', 'Date')
  },

  after: function(browser) {
    browser
      .end()
  }
}
