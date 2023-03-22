import { describe, test } from 'vitest'
// import ItemSetup from '@/components/ItemSetup.vue'
import { mount, shallowMount } from '@vue/test-utils'
import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from '@pinia/testing'

// PROBLEM WITH TEMPLATE TAGS IN ITEMSETUP.VUE
describe('sanity', () => {
  test.todo('sanity', () => {
    expect(true).toBe(true)
  });
});

// describe('Component exists in DOM (and/or does not, if should not)', () => {
//   let wrapper = null

//   afterEach(() => {
//     wrapper.unmount()
//   })

//   test("should mount component", () => {
//     wrapper = mount(ItemSetup, {
//       global: {
//         plugins: [createTestingPinia({
//           // createSpy: vi.fn,
//           initialState: {
//             modal: {
//               modalList: {
//                 showItemSetup: true,
//               }
//             }
//           }
//         })],
//       },
//     });

//     expect(wrapper.find("div").isVisible()).toBeTruthy();
//     expect(wrapper.isVisible()).toBe(true)
//   })

//   test.todo('should display proper text', () => {
//     wrapper = mount(ItemSetup, {
//       global: {
//         plugins: [createTestingPinia({
//           // createSpy: vi.fn,
//           initialState: {
//             modal: {
//               modalList: {
//                 showItemSetup: true,
//               }
//             }
//           }
//         })],
//       },
//     });

//     // expect(wrapper.text()).toMatch("Dummy Text");
//   });

//   test('{ showItemSetup: false } should not display element', () => {
//     wrapper = mount(ItemSetup, {
//       global: {
//         plugins: [createTestingPinia({
//           // createSpy: vi.fn,
//           initialState: {
//             modal: {
//               modalList: {
//                 showItemSetup: false,
//               }
//             }
//           }
//         })],
//       },
//     })

//     expect(wrapper.isVisible()).toBe(false)
//     expect(wrapper.html()).toBe('<!--v-if-->')
//   });
// });