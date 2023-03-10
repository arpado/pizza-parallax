// import { mount, shallowMount } from '@vue/test-utils'
// import BookingElement from '@/components/BookingElement.vue'  // Import Vue component to test
// import { createPinia, setActivePinia, defineStore } from 'pinia'
// import { createTestingPinia } from '@pinia/testing'
// import { useModalStore } from '@/stores/modalStore'

// describe('Checking showBooking functionality', () => {

// let wrapper = null;

//   beforeEach(() => {
//     // render the component
//     wrapper = mount(BookingElement, {
//       global: {
//         plugins: [createTestingPinia()],
//       },
//     })    
    
//     // set any initial data and create the mocks of libraries
//   })

//   afterEach(() => {
//     wrapper.unmount()
//   })

//   test('{ showBooking: true } should display element', () => {
//     const modalStore = useModalStore()
//     modalStore.modalList.showBooking = true
//     expect(wrapper.findAll('h3').at(0).text()).toMatch('Book Your Table')
//   });

//   test('{ showBooking: false } should not display element', () => {
//     const modalStore = useModalStore()
//     modalStore.modalList.showBooking = false
//     expect(wrapper).toBeNull()
//   });

// //   it('check successful events', () => { ... })

// //   it('check failure events', () => { ... })
// })

import { mount } from '@vue/test-utils'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})