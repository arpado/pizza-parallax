import { mount, shallowMount } from '@vue/test-utils'
import FooterElement from '@/components/FooterElement.vue'
import { expect } from 'vitest';

describe('FooterElement tests', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(FooterElement)
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should mount element and be visible', () => {
        expect(wrapper.isVisible()).toBe(true)
    });

    test('should have appropriate number, name and path of links', () => {
        expect(wrapper.findAll('.nuxt-link').length).toBe(3)
        expect(wrapper.findAll('.nuxt-link')[0].text()).toBe('Home')
        expect(wrapper.findAll('.nuxt-link')[0].attributes('to')).toBe('/')
        expect(wrapper.findAll('.nuxt-link')[1].text()).toBe('Our Menu')
        expect(wrapper.findAll('.nuxt-link')[1].attributes('to')).toBe('menu')
        expect(wrapper.findAll('.nuxt-link')[2].text()).toBe('Register')
        expect(wrapper.findAll('.nuxt-link')[2].attributes('to')).toBe('user-registration')
    });
    test('should contain contacts and copyright', () => {
        expect(wrapper.get('.contacts').html()).toBeDefined()
        expect(wrapper.get('.copyright').html()).toBeDefined()
    });
});