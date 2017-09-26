import Vue from 'vue'
import RecordRow from '@/components/RecordRow'

const propsData = {
  record: {
    id: '-KuqPumtnjFdgMab8TtQ',
    title: 'Medicine K4',
    quantity: 32,
    date: new Date(2012, 3, 21)
  }
}

const Constructor = Vue.extend(RecordRow)
const vm = new Constructor({ propsData: propsData })

describe('RecordRow Unit Test', () => {

  before(() => {
    vm.$mount()
  })

  it('should be correct components', () => {
    expect(vm)
      .to.be.an('object')
      .that.is.an.instanceof(Constructor)
  })

  it('should has correct props', () => {
    expect(vm.$props)
      .to.be.an('object')
      .that.deep.equal(propsData)
  })

  it('should has correct name', () => {
    expect(vm.$options.name)
      .to.be.a('string')
      .that.equal('record-row')
  })

  it('should has correct data', () => {
    expect(vm.$data)
      .to.be.an('object')
      .that.deep.equal({
        editing: false,
        title: null,
        quantity: null,
        date: null
      })
  })

  it('should has correct methods', () => {
    expect(vm.$options.methods).to.be.an('object')
    expect(vm.$options.methods.beginEditing).to.exist.and.is.a('function')
    expect(vm.$options.methods.endEditing).to.exist.and.is.a('function')
    expect(vm.$options.methods.edit).to.exist.and.is.a('function')
    expect(vm.$options.methods.remove).to.exist.and.is.a('function')
  })

  after(() => {
    vm.$destroy()
  })
})
