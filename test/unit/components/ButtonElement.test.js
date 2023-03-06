import { mount } from '@vue/test-utils'
import ButtonElement from '@/components/ButtonElement.vue'


test('displays message', () => {
  const wrapper = mount(ButtonElement, {
    props: {
      text: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})