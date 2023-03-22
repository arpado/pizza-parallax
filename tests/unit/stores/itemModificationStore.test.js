import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useItemModificationStore } from '@/stores/itemModificationStore'
import { registerWithEmail, postLoginForm } from '@/composables/userAuth'
import { newPizza, oldPizza, pizzaSizeDataRequest, pizzaSizeDataRequest2, pizzaCrustDataRequest, pizzaAdditionalOptionsRequest, pizzaAggregatedProps, pizzaSelectedOptions, drinkSizeDataRequest, drinkAggregatedProps, pizzaOrderItem } from './inputData/itemModStoreTestInput'
import * as serverReq from '@/composables/serverRequests'
import { getItemData } from '@/composables/serverRequests'
import { describe, expect } from 'vitest'
// let serverReq = require('@/composables/serverRequests')

// const wrapper = mount(Counter, {
//   global: {
//     plugins: [createTestingPinia({
//       stubActions: false,
//     })],
//   },
// })

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  // this here is not possible??
  // const itemModStore  = useItemModificationStore();
}

beforeEach(() => {
  setup()
})

afterEach(() => {
  vi.clearAllMocks()
  vi.restoreAllMocks()
})

describe('Sanity check to see how a basic test works', () => {

  test("Sanity check", () => {
    expect(true).toBe(true);
  });
})


describe('check if loadItem() loads the proper data', () => {

  test('itemOnMod should be empty in the beginning', () => {
    const itemModStore = useItemModificationStore();
    expect(itemModStore.itemOnMod).toBe(null)
  });

  test('itemOnMod should be a new item', async () => {
    const itemModStore = useItemModificationStore();

    vi.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })

    await itemModStore.loadItem(newPizza)
    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });

  test('new itemOnMod object should replace the old one', async () => {
    const itemModStore = useItemModificationStore();
    // expect.assertions(1) ???

    vi.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
    await itemModStore.loadItem(oldPizza)

    vi.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
    await itemModStore.loadItem(newPizza)

    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });
})

describe('getAdditionalOptionsList(item) tests', () => {

  test('pizza call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "pizzas",
    }

    vi.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })

    let res = await itemModStore.getAdditionalOptionsList(param)
    expect(res).toMatchObject(pizzaAggregatedProps)
  });

  test('drinks call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "drinks",
    }

    vi.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return drinkSizeDataRequest })
      .mockImplementationOnce(() => { return crustData })
      .mockImplementationOnce(() => { return additionalOptions })

    let res = await itemModStore.getAdditionalOptionsList(param)
    expect(res).toMatchObject(drinkAggregatedProps)
  });

  test('desserts call should return a string for now', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "desserts",
    }

    // vi.spyOn(serverReq, 'getItemData')
    //   .mockImplementationOnce(() => { return drinkSizeDataRequest })
    // .mockImplementationOnce(() => { return crustData })
    // .mockImplementationOnce(() => { return additionalOptions })

    let res = await itemModStore.getAdditionalOptionsList(param)
    expect(res).toMatchObject('Desserts not available yet!')
  });

  test('call with wrong param should return error', async () => {
    const itemModStore = useItemModificationStore();
    let param = 'wrongParam'
    let error = console.error('Error in additional options')

    // vi.spyOn(serverReq, 'getItemData')
    //   .mockImplementationOnce(() => { return drinkSizeDataRequest })
    // .mockImplementationOnce(() => { return crustData })
    // .mockImplementationOnce(() => { return additionalOptions })

    let res = await itemModStore.getAdditionalOptionsList(param)

    expect(res).toMatchObject(error)
  });

  test.todo('call with no param should return error', async () => {
    const itemModStore = useItemModificationStore();
    let param = null
    let error = console.error('Error: No item set in function getAdditionalOptionsList!')

    let res = await itemModStore.getAdditionalOptionsList(param)

    expect(res).toMatchObject(error)
  });
});


describe('more and less items on modification', () => {

  test('quantity should increase on call', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.moreItem()
    expect(itemModStore.selectedItemQuantity).toBe(2)
  });

  test('quantity should not decrease on call below 1', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.fewerItem()
    expect(itemModStore.selectedItemQuantity).toBe(1)
  });

  test('quantity should decrease on call', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.selectedItemQuantity = 2
    itemModStore.fewerItem()
    expect(itemModStore.selectedItemQuantity).toBe(1)
  });
});

describe('getSelectedProps test group', () => {

  test('should return the proper object', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.aggregatedProps = pizzaAggregatedProps

    let expectedRes = {
      crust: { name: 'thin', price: 0 },
      size: { price: 18, name: 'medium - 32 cm' }
    }

    let res = itemModStore.getSelectedProps()
    expect(res).toMatchObject(expectedRes)
  });
});

describe('getPropPrices test group', () => {

  test('should return the approx. float', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.aggregatedProps = pizzaAggregatedProps

    let res = itemModStore.getPropPrices()
    expect(res).toBeCloseTo(18, 1);
  });

  test.todo('should change the price if new element is chosen', () => {

  });
});

describe('getAdditionalOptionsPrice() tests', () => {
  test('should return the proper value', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.aggregatedProps = pizzaAggregatedProps
    itemModStore.aggregatedProps.selectedOptions = pizzaSelectedOptions

    let res = itemModStore.getAdditionalOptionsPrice()
    expect(res).toBeCloseTo(30, 1);
  });
});

describe('createItem() tests', () => {
  test('should return the proper object', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.itemOnMod = newPizza
    itemModStore.aggregatedProps = pizzaAggregatedProps
    itemModStore.aggregatedProps.selectedOptions = pizzaSelectedOptions

    let res = itemModStore.createItem()
    expect(res).toMatchObject(pizzaOrderItem)
  });
});

// GETTER todo//
describe('getSumItemPrice(state) tests', () => {
  test.todo('should return the correct price', () => {
    const itemModStore = useItemModificationStore();

    let res = itemModStore.getSumItemPrice()
    expect(res).toMatchObject(null)
  });
});
