import { mount, shallowMount } from '@vue/test-utils'
import ParallaxImageComponent from '@/components/ParallaxImageComponent.vue'

describe('Component exists in DOM', () => {
    let wrapper = null
  
    beforeEach(() => {
      // render the component
  
      wrapper = mount(ParallaxImageComponent, {
        props: {
          imgName: "",
        },
        // global: {
        //   plugins: [createTestingPinia({
        //     // createSpy: vi.fn,
        //     initialState: {}
        //   })],
        // },
      });
  
      // set any initial data and create the mocks of libraries
  
    })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    test("should mount component", () => {
  
      expect(wrapper.find("div").isVisible()).toBeTruthy();
      expect(wrapper.isVisible()).toBe(true)
    })
  
    test.todo('should display given image', () => {
  
    //   expect(wrapper.text()).toMatch("Dummy Text");
    });
  
  
    // it('check successful events', () => { ... })
  
    // expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
    // expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
    // expect(wrapper.isVisible()).toBe(true)
    // expect(wrapper.find("div").isVisible()).toBeTruthy();
  
    // it('check failure events', () => { ... })
    // expect(wrapper.text()).toContain('Hello world')
  
  
  });
  