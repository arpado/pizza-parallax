import { mount, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CartElement from '@/components/CartElement.vue'

describe('CartElement exists in DOM (and does not, if should not)', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(CartElement, {
            global: {
              plugins: [createTestingPinia({
                // createSpy: vi.fn,
                initialState: {
                  modal: {
                    modalList: {
                      showCart: true,
                    }
                  }
                }
              })],
            },
          });
      })
  
    afterEach(() => {
      wrapper.unmount()
    })
  
    test("should mount CartElement", () => {
    //   wrapper = mount(CartElement, {
    //     global: {
    //       plugins: [createTestingPinia({
    //         // createSpy: vi.fn,
    //         initialState: {
    //           modal: {
    //             modalList: {
    //               showCart: true,
    //             }
    //           }
    //         }
    //       })],
    //     },
    //   });
  
      expect(wrapper.find("div").isVisible()).toBeTruthy();
      expect(wrapper.isVisible()).toBe(true)
    })
  
    test('should display proper text', () => {
    //   wrapper = shallowMount(CartElement, {
    //     global: {
    //       plugins: [createTestingPinia({
    //         // createSpy: vi.fn,
    //         initialState: {
    //           modal: {
    //             modalList: {
    //               showCart: true,
    //             }
    //           }
    //         }
    //       })],
    //     },
    //   });
  
      expect(wrapper.findAll('h3').at(0).text()).toBe("In Cart:");
    });
  
    test('{ showCart: false } should not display element', () => {
      wrapper = mount(CartElement, {
        global: {
          plugins: [createTestingPinia({
            // createSpy: vi.fn,
            initialState: {
              modal: {
                modalList: {
                  showCart: false,
                }
              }
            }
          })],
        },
      })
  
      expect(wrapper.isVisible()).toBe(false)
    });
  });

  describe('showCart dinamic data from cartStore', () => {
      let wrapper

      beforeEach(() => {
        wrapper = mount(CartElement, {
            global: {
              plugins: [createTestingPinia({
                // createSpy: vi.fn,
                initialState: {
                  modal: {
                    modalList: {
                      showCart: true,
                    }
                  }
                }
              })],
            },
          });
      })

      afterEach(() => {
        wrapper.unmount()
      })

      test.todo('should show dinamic data from cartStore', () => {
          
      });
      test.todo('should render buttons for dinamic items', () => {
          
      });
      test.todo('should register clicks on dinamic buttons', () => {
          
      });
      test('should show "Cart is empty!" if no data in cartStore', () => {
          expect(wrapper.get('.empty-cart').text()).toContain('Your cart is empty!')
      });
      test.todo('should show correct value in orderTotal, getting it from cartStore', () => {
          
      });
      test.todo('should display proceed button', () => {
          
      });
      test.todo('should register click event on proceed button', () => {
          
      });
  });
  describe('Testing CartElement functions', () => {
      test.todo('should function proceedToCheckout work', () => {
          
      });
  });