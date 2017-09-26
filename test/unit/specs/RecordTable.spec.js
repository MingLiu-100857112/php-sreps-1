import Vue from 'vue'
import RecordTable from '@/components/RecordTable'

const Constructor = Vue.extend(RecordTable)

describe('RecordTable Unit Test', () => {

  var vm = new Constructor()

  before(() => {
    vm.$mount()
  })

  it('should be correct components', () => {
    expect(vm)
      .to.be.a('object')
      .to.be.an.instanceof(Constructor)
  })

  it('should has correct name', () => {
    expect(vm.$options.name)
      .to.be.a('string')
      .that.equal('record-table')
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('table')).to.exist
    expect(vm.$el.querySelector('thead')).to.exist
    expect(vm.$el.querySelector('tr')).to.exist
    expect(vm.$el.querySelectorAll('th').item(0).innerHTML).to.be.equal('Identifier')
    expect(vm.$el.querySelectorAll('th').item(1).innerHTML).to.be.equal('Title')
    expect(vm.$el.querySelectorAll('th').item(2).innerHTML).to.be.equal('Quantity')
    expect(vm.$el.querySelectorAll('th').item(3).innerHTML).to.be.equal('Date')
    expect(vm.$el.querySelectorAll('th').item(4).innerHTML).to.be.equal('')
    expect(vm.$el.querySelector('tbody')).to.exist
  })

  after(() => {
    vm.$destroy()
  })
})
