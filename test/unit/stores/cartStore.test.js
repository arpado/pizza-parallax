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

const testOrderItemNegativQuantity = {
  name: "test_product",
  id: '1',
  type: "test_type",
  price: 100,
  quantity: -1,
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

describe('Cart Store tests', () => {
  beforeEach(() => {
    setup()
  })

  afterEach(() => {
    // cartStore.$reset()
    cartStore=null;
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

  it('add product with negativ Qantity and throw a warning message', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    cartStore.addToOrder(testOrderItemNegativQuantity)
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  })

  it('add product and decrease the quantity 2 times but it should stay 1 quantity', () => {
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.itemOnOrder[0].quantity).toBe(1)
    cartStore.lessItem(0)
    expect(cartStore.itemOnOrder[0].quantity).toBe(1)
  })

  it('add product and increase then decrease the item quantity', () => {
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.itemOnOrder[0].quantity).toBe(1)
    cartStore.moreItem(0)
    expect(cartStore.itemOnOrder[0].quantity).toBe(2)
    cartStore.lessItem(0)
    expect(cartStore.itemOnOrder[0].quantity).toBe(1)
  })

  it('add product and increase the item quantity', () => {
    cartStore.addToOrder(testOrderItem)
    expect(cartStore.itemOnOrder[0].quantity).toBe(1)
    cartStore.moreItem(0)
    expect(cartStore.itemOnOrder[0].quantity).toBe(2)
    cartStore.moreItem(0)
    expect(cartStore.itemOnOrder[0].quantity).toBe(3)
    cartStore.deleteItem(testOrderItem.name, testOrderItem.size)
    expect(cartStore.totalPrice).toBe("0.00")
  })

  it('call sendOrder without user defined', () => {
    cartStore.addToOrder(testOrderItem)
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    cartStore.sendOrder()
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  })

})

