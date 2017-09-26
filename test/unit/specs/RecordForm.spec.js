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

  after(() => {
    vm.$destroy()
  })
})
