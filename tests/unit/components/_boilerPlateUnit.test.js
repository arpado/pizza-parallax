// import { describe, test } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import Component from '@/components/Component.vue'
import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from '@pinia/testing'



// test('displays message', () => {
//   const wrapper = mount(ButtonElement, {
//     props: {
//       text: 'Hello world'
//     }
//   })

//   // Assert the rendered text of the component
//   // expect(wrapper.text()).toContain('Hello world')
// })

// test.only('sanity', () => {
//   expect(true).toBe(true)
// });

// modals

describe('Component exists in DOM (and/or does not, if should not)', () => {
  let wrapper = null

  afterEach(() => {
    wrapper.unmount()
  })

  test.todo("should mount component", () => {
    wrapper = mount(Component, {
      props: {
        propName: "value",
      },
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                __SHOWMODAL__: true,
              }
            }
          }
        })],
      },
    });

    expect(wrapper.find("div").isVisible()).toBeTruthy();
    expect(wrapper.isVisible()).toBe(true)
  })

  test.todo('should display proper text', () => {
    wrapper = mount(Component, {
      props: {
        propName: "value",
      },
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                __SHOWMODAL__: true,
              }
            }
          }
        })],
      },
    });

    expect(wrapper.text()).toMatch("Dummy Text");
  });

  test.todo('{ showBooking: false } should not display element', () => {
    wrapper = mount(Component, {
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                __SHOWMODAL__: false,
              }
            }
          }
        })],
      },
    })

    expect(wrapper.isVisible()).toBe(false)
    expect(wrapper.html()).toBe('<!--v-if-->')
  });
});

// else
describe('Component exists in DOM', () => {
  let wrapper = null

  beforeEach(() => {
    // render the component

    wrapper = mount(Component, {
      props: {
        propName: "value",
      },
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {}
        })],
      },
    });

    // set any initial data and create the mocks of libraries

  })

  afterEach(() => {
    wrapper.unmount()
  })

  test.todo("should mount component", () => {

    expect(wrapper.find("div").isVisible()).toBeTruthy();
    expect(wrapper.isVisible()).toBe(true)
  })

  test.todo('should display proper text', () => {

    expect(wrapper.text()).toMatch("Dummy Text");
  });


  // it('check successful events', () => { ... })

  // expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
  // expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
  // expect(wrapper.isVisible()).toBe(true)
  // expect(wrapper.find("div").isVisible()).toBeTruthy();

  // it('check failure events', () => { ... })
  // expect(wrapper.text()).toContain('Hello world')


});


