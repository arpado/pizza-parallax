import { mount, shallowMount } from '@vue/test-utils'
import MainImageElement from '@/components/MainImageElement.vue'

describe('Component exists in DOM', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(MainImageElement)
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test("should mount component", () => {
        expect(wrapper.find("div").isVisible()).toBeTruthy();
        expect(wrapper.isVisible()).toBe(true)
    })

    // test('should display proper text', () => {

    //     expect(wrapper.find('.container').css('background-image')).toMatch('url("/images/pizza-tray.png")');
    // });
});