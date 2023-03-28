import { mount, shallowMount } from '@vue/test-utils'
import LogoElement from '@/components/LogoElement.vue'

describe('LogoElement exists in DOM', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(LogoElement);
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test("should mount LogoElement", () => {
        expect(wrapper.isVisible()).toBe(true)
    })

    test('should display proper text', () => {
        expect(wrapper.findAll('span').length).toBe(13);
    });
});