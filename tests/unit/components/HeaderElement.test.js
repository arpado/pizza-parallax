import { mount, shallowMount } from '@vue/test-utils'
import HeaderElement from '@/components/HeaderElement.vue'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { render, screen, fireEvent } from "@testing-library/vue";


import { expect, mockRestore } from 'vitest';

describe('HeaderElement tests', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(HeaderElement, {
            global: {
                plugins: [createTestingPinia(
                //     {
                //     // createSpy: vi.fn,
                //     initialState: {
                //         modal: {
                //             modalList: {
                //                 showBooking: true,
                //             }
                //         }
                //     }
                // }
                )],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should mount element and be visible', () => {
        expect(wrapper.isVisible()).toBe(true)
    });



});

describe('HeaderElement functions', () => {
    let wrapper

    afterEach(() => {
        vi.restoreAllMocks()
        wrapper.unmount()
    })

  
    test('should reload', () => {
        let reloadFunction = vi.spyOn(HeaderElement.methods, 'reload')
        wrapper = shallowMount(HeaderElement, {
            global: {
                plugins: [createTestingPinia()],
            },
        })

        wrapper.get('.logo').trigger('click')
        expect(reloadFunction).toHaveBeenCalledOnce()
    });

    test('should toggle dropdown nav menu', () => {
        wrapper = shallowMount(HeaderElement, {
            global: {
                plugins: [createTestingPinia()],
            },
        })
        let testFunc = wrapper.vm.toggleMenu
        
        expect(wrapper.vm.menuVisible).toBe(false)
        testFunc()
        expect(wrapper.vm.menuVisible).toBe(true)
    });

    test.todo('should close dropdown menu on outside click', () => {
        let e = {target: {classList: ['.notHamburger']}}

        wrapper = shallowMount(HeaderElement, {
            global: {
                plugins: [createTestingPinia()],
            },
        })
        let testFunc = wrapper.vm.closeOpenNavMenu
        wrapper.vm.menuVisible = true
        // wrapper.get().trigger('click')
        testFunc(e)
        expect(wrapper.vm.menuVisible).toBe(false)

        // const wrapper = render(HeaderElement)
        // console.log(wrapper)
        // header should be mounted, menuVisible should be true

        // should click outside

        // expect menuVisible to be false, menu should close
    });
    
    test.todo('should updateScroll()', () => {
        
    });
});