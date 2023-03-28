import { mount, shallowMount } from '@vue/test-utils'
import MenuElement from '@/components/MenuElement.vue'
import { createTestingPinia } from '@pinia/testing'
import { useModalStore } from "@/stores/modalStore";
import { useItemModificationStore } from "@/stores/itemModificationStore";

describe('Component exists in DOM', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = mount(MenuElement, {
            props: {
                item: {
                    description: "Tomato, Parmigiano Reggiano, tuna, olives, garlic, capers, onion, and hot Calabrian chili peppers",
                    id: 13,
                    table: "pizzas",
                    image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
                    name: "Calabrese",
                    price: 15,
                    size: 1,
                  },
            },
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

    test("should mount component", () => {
        expect(wrapper.find("div").isVisible()).toBeTruthy();
        expect(wrapper.isVisible()).toBe(true)
    })

    test('should display proper text', () => {
        expect(wrapper.find('.item-name').text()).toMatch('Calabrese');
        expect(wrapper.find('[data-test="image"]').attributes('src')).toBe("https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg");
        expect(wrapper.find('[data-test="description"]').text()).toBe("Tomato, Parmigiano Reggiano, tuna, olives, garlic, capers, onion, and hot Calabrian chili peppers");
        expect(wrapper.find('[data-test="price"]').text()).toBe("$15");
    });

    test('should call modifyItem', () => {
        const itemModificationStore = useItemModificationStore()
        const modalStore = useModalStore()
        let item = {
            description: "Tomato, Parmigiano Reggiano, tuna, olives, garlic, capers, onion, and hot Calabrian chili peppers",
            id: 13,
            table: "pizza",
            image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
            name: "Calabrese",
          }
        // make spies
        let spyLoadItem= vi.spyOn(itemModificationStore, 'loadItem')
        let spyModal = vi.spyOn(modalStore, 'openModal')
        // console.log(wrapper.vm.modifyItem)
        // callfunc
        wrapper.vm.modifyItem(item, 'pizza')
        // assert
        expect(itemModificationStore.loadItem).toHaveBeenCalledTimes(1)
        expect(itemModificationStore.loadItem).toHaveBeenCalledWith(item, 'pizza')
        expect(modalStore.openModal).toBeCalledTimes(1)
        expect(modalStore.openModal).toHaveBeenCalledWith("showItemSetup")


    });
});
