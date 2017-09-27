import Vue from 'vue'
import RecordForm from '@/components/RecordForm'

const Constructor = Vue.extend(RecordForm)
const vm = new Constructor()

describe('RecordForm Unit Test', () => {

  before(() => {
    vm.$mount()
  })

  it('should be correct components', () => {
    expect(vm)
      .to.be.an('object')
      .that.is.an.instanceof(Constructor)
  })

  it('should has correct name', () => {
    expect(vm.$options.name)
      .to.be.a('string')
      .that.equal('record-form')
  })

  it('should has correct data', () => {
    expect(vm.$data)
      .to.be.an('object')
      .that.deep.equal({
        title: null,
        quantity: null,
        date: null
      })
  })

  it('should has correct methods', () => {
    expect(vm.$options.methods).to.be.a('object')
    expect(vm.$options.methods.addNewRecord).to.exist.and.is.a('function')
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('form')).to.exist
    expect(vm.$el.querySelector('fieldset')).to.exist
    expect(vm.$el.querySelector('legend').innerHTML).to.be.equal('Enter new record')
    expect(vm.$el.querySelectorAll('label').item(0).innerHTML).to.be.equal('Title')
    expect(vm.$el.querySelectorAll('label').item(1).innerHTML).to.be.equal('Quantity')
    expect(vm.$el.querySelectorAll('label').item(2).innerHTML).to.be.equal('Date')
    expect(vm.$el.querySelectorAll('input').item(0).getAttribute('placeholder')).to.be.equal('Title')
    expect(vm.$el.querySelectorAll('input').item(1).getAttribute('placeholder')).to.be.equal('Quantity')
    expect(vm.$el.querySelectorAll('input').item(2).getAttribute('placeholder')).to.be.equal('Date')
    expect(vm.$el.querySelector('button').innerHTML).to.be.equal('Add Record')
  })

  after(() => {
    vm.$destroy()
  })
})
