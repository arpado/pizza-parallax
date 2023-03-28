import { mount, shallowMount } from '@vue/test-utils'
import SectionElement from '@/components/SectionElement.vue'

describe('Component exists in DOM', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component

        wrapper = mount(SectionElement, {
            props: {
                content: {
                    title: "Using only the best quality ingredients for our pizzas!",
                    image: "ingredients.jpg",
                    text: [
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dolorum enim natus quasi pariatur, itaque quidem, voluptas vero eligendi non laborum. Animi, impedit natus esse sint error ratione quo eos, recusandae velit, laborum provident excepturi exercitationem eum odit in quod.",
                        "Necessitatibus mollitia adipisci quas perspiciatis odit voluptates magnam facilis totam temporibus. Voluptatibus repellat perferendis consequatur voluptatem suscipit quisquam, harum omnis assumenda facilis rem molestiae laboriosam asperiores pariatur mollitia eveniet, vitae ducimus quia ipsam reprehenderit, illum possimus obcaecati soluta quam.",
                        "Suscipit quas vel voluptate. Eius fuga nam assumenda magni hic autem cumque laudantium expedita saepe impedit. Dolorem doloribus at deleniti velit!"
                    ]
                },
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
