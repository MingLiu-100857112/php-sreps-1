import Vue from 'vue'
import RecordTable from '@/components/RecordTable'

const Constructor = Vue.extend(RecordTable)
const vm = new Constructor()

describe('RecordTable Unit Test', () => {

  before(() => {
    vm.$mount()
  })

  it('should be correct components', () => {
    expect(vm)
      .to.be.an('object')
      .to.be.an.instanceof(Constructor)
  })

  it('should has correct name', () => {
    expect(vm.$options.name)
      .to.be.a('string')
      .that.equal('record-table')
  })

  after(() => {
    vm.$destroy()
  })
})
