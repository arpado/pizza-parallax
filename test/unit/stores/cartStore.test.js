import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { OrderItemClassInstance } from '@/stores/itemModificationStore'

const testOrderItem = {
  name: "test_product",
  id: '1',
  type: "test_type",
  price: 100,
  quantity: 1,
  sumPrice: 100
}


let cartStore = undefined;

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  // productStore = useProductStore()
  // productStore.$state = {
  //   ids: ['1'],
  //   all: { 1: testOrderItem }
  // }
  // cartStore = useCartStore();
  cartStore = useCartStore();
}

describe('Sanity check to see how a basic test works', () => {
  test("Sanity check", () => {
    expect(true).toBe(true);
  });

})

describe('Cart Store tests', () => {
  beforeEach(() => {
    setup()
  })

  afterEach(() => {
    cartStore.$reset()
  })

  it('add 1 product to the card and remove it. The cart should be empty', () => {
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.totalPrice).toBe("100.00")
    cartStore.deleteItem(testOrderItem.name, testOrderItem.size)
    expect(cartStore.totalPrice).toBe("0.00")
  })

  it('add 2 product to the card, the sum should be 2 times of the price', () => {
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.totalPrice).toBe("100.00")
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.totalPrice).toBe("200.00")
  })

})

