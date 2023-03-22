import { describe, test } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import LoaderElement from '@/components/LoaderElement.vue'
import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from '@pinia/testing'

describe('Component exists in DOM', () => {
    let wrapper = null
  
    beforeEach(() => {
      // render the component
  
      wrapper = mount(LoaderElement);
  
      // set any initial data and create the mocks of libraries
  
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    test("should mount component", () => {
      expect(wrapper.find("div").isVisible()).toBeTruthy();
      expect(wrapper.isVisible()).toBe(true)
    })
  
    test('should displayimage of the plate', () => {
      expect(wrapper.get('.plate-image').attributes('src')).toBe('/src/images/plate.png');
    });
  
    test.only('should display 8 pizza slice on the plate', () => {
        expect(wrapper.findAll('.pizza-slice').length).toBe(8)
    });
    // it('check successful events', () => { ... })
  
    // expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
    // expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
    // expect(wrapper.isVisible()).toBe(true)
    // expect(wrapper.find("div").isVisible()).toBeTruthy();
  
    // it('check failure events', () => { ... })
    // expect(wrapper.text()).toContain('Hello world')
  
  
  });
  