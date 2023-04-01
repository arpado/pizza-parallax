import { mount, shallowMount } from '@vue/test-utils'
import LoginElement from '@/components/LoginElement.vue'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { render, screen, fireEvent } from "@testing-library/vue";
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { expect, test } from 'vitest';

describe('modal visibility test', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(LoginElement, {
            global: {
                plugins: [createTestingPinia(
                    {
                        // createSpy: vi.fn,
                        initialState: {
                            modal: {
                                modalList: {
                                    showLogin: true,
                                }
                            }
                        }
                    }
                )],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should mount element and be visible', () => {
        expect(wrapper.isVisible()).toBe(true)
        expect(wrapper.findAll('h3')[0].text()).toBe('LOGIN')
    });

    test('should mount element and not be visible', async () => {
        let modalStore = useModalStore()
        await modalStore.$patch({ modalList: { showLogin: false } })

        expect(wrapper.isVisible()).toBe(false)
        expect(wrapper.html()).toBe('<!--v-if-->')
    });
});

describe('LoginElement functionality tests', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(LoginElement, {
            global: {
                plugins: [createTestingPinia(
                    {
                        // createSpy: vi.fn,
                        initialState: {
                            modal: {
                                modalList: {
                                    showLogin: true,
                                }
                            }
                        }
                    }
                )],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    test('should call login with correct parameters', async() => {
        let userStore = useUserStore()
        let userLogin = vi.spyOn(userStore, 'login')
        let email = await wrapper.find('#email')
        let password = await wrapper.find('#password')

        email.setValue('test@test.com')
        password.setValue('password')
        await wrapper.find('#login-button').trigger('click')

        expect(userLogin).toHaveBeenCalledTimes(1)
        expect(userLogin).toHaveBeenCalledWith('test@test.com', 'password')
    });

    test.todo('should display error on failed login', () => {
        
    });
    test.todo('should close modal if login successful', () => {
        
    });
});