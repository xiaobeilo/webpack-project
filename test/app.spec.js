import { shallowMount } from '@vue/test-utils'
import App from '../src/app.vue'
import expect from 'expect'

describe('APP', () => {
  const wrapper = shallowMount(App)
  it('test-id', () => {
    expect( wrapper.attributes('id') ).toBe('app')
  })
})