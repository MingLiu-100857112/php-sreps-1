import Vue from 'vue'
import RecordForm from '@/components/RecordForm'

const Constructor = Vue.extend(RecordForm)

describe('RecordForm Unit Tests', () => {

  var vm = new Constructor()

  before(() => {
    vm.$mount()
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('legend').textContent)
      .to.equal('Enter new record')
  })

  after(() => {
    vm.$destroy()
  })
})
