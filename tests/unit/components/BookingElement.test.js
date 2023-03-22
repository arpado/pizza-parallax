import { mount, shallowMount } from '@vue/test-utils'
import BookingElement from '@/components/BookingElement.vue'  // Import Vue component to test
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useModalStore } from '@/stores/modalStore'

describe('Checking showBooking functionality', async () => {

  let wrapper = null;

  afterEach(() => {
    wrapper.unmount()
  })

  test('{ showBooking: true } should display element', () => {
    wrapper = mount(BookingElement, {
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                showBooking: true,
              }
            }
          }
        })],
      },
    })
    // const wrapper = mount(Counter, {
    //   global: {
    //     plugins: [createTestingPinia()],
    //   },
    // })
    
    // const store = useSomeStore() // uses the testing pinia!

    // const store = useModalStore()
    // store.$patch({
    //   modalList: {
    //     showBooking: true,
    //   }
    // })

    expect(wrapper.isVisible()).toBe(true)
  });

  test('{ showBooking: false } should not display element', () => {
    wrapper = mount(BookingElement, {
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                showBooking: false,
              }
            }
          }
        })],
      },
    })

    expect(wrapper.isVisible()).toBe(false)
    expect(wrapper.html()).toBe('<!--v-if-->')
  });
  
  test('text should be there if {showBooking: true }', () => {
    wrapper = mount(BookingElement, {
      global: {
        plugins: [createTestingPinia({
          // createSpy: vi.fn,
          initialState: {
            modal: {
              modalList: {
                showBooking: true,
              }
            }
          }
        })],
      },
    })

    expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
    expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
  });
})
