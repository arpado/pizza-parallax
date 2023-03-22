import { mount, shallowMount } from '@vue/test-utils'
import ContactsElement from '@/components/ContactsElement.vue'
import { beforeEach, expect } from 'vitest';
import contacts from '@/content/contacts.json'

describe('ContactsElement tests', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(ContactsElement, {
            props: {
                content: contacts,
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should mount element and be visible', () => {
        expect(wrapper.isVisible()).toBe(true)
    });
    test('should display image of a map based on content.map', () => {
        expect(wrapper.get('img').attributes('src')).toBe('images/map.jpg')
    });
    test('should display address and info', () => {
        expect(wrapper.text()).toContain("Local City, Main Street 3.")
        expect(wrapper.text()).toContain("(01) 234 - 567 - 89")
        expect(wrapper.text()).toContain("pizza(at)parallax.com")
        
    });
    test('should display a list foropen/closed days', () => {
        expect(wrapper.findAll('[data-test="open-hrs"]')[0].text()).toBe('Closed')
        expect(wrapper.findAll('[data-test="open-hrs"]')[1].text()).toBe('8-22')
        expect(wrapper.findAll('[data-test="open-hrs"]')[2].text()).toBe('8-22')
        expect(wrapper.findAll('[data-test="open-hrs"]')[3].text()).toBe('8-22')
        expect(wrapper.findAll('[data-test="open-hrs"]')[4].text()).toBe('8-24')
        expect(wrapper.findAll('[data-test="open-hrs"]')[5].text()).toBe('8-24')
        expect(wrapper.findAll('[data-test="open-hrs"]')[6].text()).toBe('8-24')
    });


    test.todo('should match snapshot', () => {
        
    });
});