import Vue from 'vue'
import RecordForm from '@/components/RecordForm'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(RecordForm)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('legend').textContent)
      .to.equal('Enter new record')
  })
})
