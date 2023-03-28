import { mount, shallowMount } from '@vue/test-utils'
import NavbarElement from '@/components/NavbarElement.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/userStore'
import { expect } from 'vitest';

describe('Component exists in DOM', () => {
    let wrapper = null

    beforeEach(() => {
        // render the component

        wrapper = mount(NavbarElement, {
            props: {
                navArray: [
                    { text: "Home", to: "/", hash: "" },
                    { text: "Our Selection", to: "menu", hash: "" },
                ],
                modalArray: [
                    { text: "Cart", event: "cart" },
                    { text: "Login", event: "login" },
                ],
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

    test("should mount component", () => {
        expect(wrapper.find("div").isVisible()).toBeTruthy();
        expect(wrapper.isVisible()).toBe(true)
    })

    test('should display proper text', () => {
        expect(wrapper.findAll('NuxtLink')[0].text()).toBe('Home');
        expect(wrapper.findAll('NuxtLink')[1].text()).toBe('Our Selection');

        // maybe check paths later
        // expect(wrapper.findAll('NuxtLink')[0].attributes('to')).toMatch({ path: '/', hash: '' });
    });
    test('should display login correctly', () => {
        let login = wrapper.find('[data-test="login"]')

        expect(login.isVisible()).toBe(true)
        expect(wrapper.findAll('[data-test="logout"]').length).toBe(0)
    });
    test('should display logout correctly', async() => {
        const userStore = useUserStore()
        await userStore.$patch({user: true})
        let logout = wrapper.find('[data-test="logout"]')

        expect(logout.isVisible()).toBe(true)
        expect(wrapper.findAll('[data-test="login"]').length).toBe(0)
    });


    // it('check successful events', () => { ... })

    // expect(wrapper.findAll('h3').at(0).text()).toContain('Book Your Table')
    // expect(wrapper.findAll('p').at(0).text()).toContain('Section under construction...')
    // expect(wrapper.isVisible()).toBe(true)
    // expect(wrapper.find("div").isVisible()).toBeTruthy();

    // it('check failure events', () => { ... })
    // expect(wrapper.text()).toContain('Hello world')

});
