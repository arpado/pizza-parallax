import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonElement from '@/components/ButtonElement.vue'


// test('displays message', () => {
//   const wrapper = mount(ButtonElement, {
//     props: {
//       text: 'Hello world'
//     }
//   })

//   // Assert the rendered text of the component
//   // expect(wrapper.text()).toContain('Hello world')
// })

test("mount component",async()=>{
  expect(ButtonElement).toBeTruthy();
  // expect(ButtonElement).toBe(null);


  const wrapper = mount(ButtonElement,{
      props:{
         text:"Guess User Age App",
      },
  });
  expect(wrapper.text()).toContain("Guess User Age App");
})

// const ButtonElement = {
//   template: '<p>{{ text }}</p>',
//   props: ['text']
// }

// test('displays message', () => {

//   const wrapper = mount(ButtonElement, {
//     props: {
//       text: 'Hello world'
//     }
//   })

//   // Assert the rendered text of the component
//   expect(wrapper.text()).toContain('Hello world')
// })