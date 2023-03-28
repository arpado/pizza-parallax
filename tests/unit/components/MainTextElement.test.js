import { mount, shallowMount } from '@vue/test-utils'
import MainTextElement from '@/components/MainTextElement.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Component exists in DOM', () => {
    let wrapper = null
  
    beforeEach(() => {
      // render the component
  
      wrapper = mount(MainTextElement, {
        global: {
          plugins: [createTestingPinia()],
        },
      }); 
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    test("should mount component", () => {
  
      expect(wrapper.find("div").isVisible()).toBeTruthy();
      expect(wrapper.isVisible()).toBe(true)
    })
  
    test('should display proper text', () => {
      expect(wrapper.find('h1').text()).toMatch("Pizza Parallax!");
    });
  
  
    // it('check successful events', () => { ... })
  
    // expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
    // expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
    // expect(wrapper.isVisible()).toBe(true)
    // expect(wrapper.find("div").isVisible()).toBeTruthy();
  
    // it('check failure events', () => { ... })
    // expect(wrapper.text()).toContain('Hello world')
  
  
  });