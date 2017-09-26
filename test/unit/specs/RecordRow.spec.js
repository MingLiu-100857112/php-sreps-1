import Vue from 'vue'
import RecordRow from '@/components/RecordRow'

const Constructor = Vue.extend(RecordRow)

describe('RecordRow Unit Test', () => {

  var vm = new Constructor()

  before(() => {
    vm.$mount()
  })

  it('should be correct components', () => {

  })

  it('should has correct props', () => {
    
  })

  it('should has correct name', () => {

  })

  it('should has correct data', () => {

  })

  it('should has correct methods', () => {

  })

  it('should render correct contents', () => {

  })

  after(() => {
    vm.$destroy()
  })
})
