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

  it('should render correct content', (done) => {
    expect(vm.$el.querySelectorAll('td').item(0).innerHTML).to.be.equal(vm.$props.record.id)
    expect(vm.$el.querySelectorAll('td').item(1).innerHTML).to.be.equal(vm.$props.record.title)
    expect(vm.$el.querySelectorAll('td').item(2).innerHTML).to.be.equal(vm.$props.record.quantity.toString())
    expect(vm.$el.querySelectorAll('td').item(3).innerHTML).to.be.equal(vm.$props.record.date.toDateString())
    expect(vm.$el.querySelectorAll('td').item(4)).to.exist
    expect(vm.$el.querySelectorAll('button').item(0).innerHTML).to.be.equal('Edit')
    expect(vm.$el.querySelectorAll('button').item(1).innerHTML).to.be.equal('Remove')
    vm.editing = true
    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('td').item(0).innerHTML).to.be.equal(vm.$props.record.id)
      expect(vm.$el.querySelectorAll('td').item(1).firstChild).to.be.equal(vm.$el.querySelectorAll('input').item(0))
      expect(vm.$el.querySelectorAll('td').item(2).firstChild).to.be.equal(vm.$el.querySelectorAll('input').item(1))
      expect(vm.$el.querySelectorAll('td').item(3).firstChild).to.be.equal(vm.$el.querySelectorAll('input').item(2))
      expect(vm.$el.querySelectorAll('td').item(4).firstChild).to.be.equal(vm.$el.querySelector('button'))
      expect(vm.$el.querySelectorAll('input').item(0).getAttribute('placeholder')).to.be.equal('Title')
      expect(vm.$el.querySelectorAll('input').item(1).getAttribute('placeholder')).to.be.equal('Quantity')
      expect(vm.$el.querySelectorAll('input').item(2).getAttribute('placeholder')).to.be.equal('Date')
      expect(vm.$el.querySelector('button').innerHTML).to.be.equal('Cancel')
      done()
    })
  })

  after(() => {
    vm.$destroy()
  })
})
