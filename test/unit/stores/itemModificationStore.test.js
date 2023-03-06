import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useItemModificationStore } from '@/stores/itemModificationStore'
import { registerWithEmail, postLoginForm } from '@/composables/userAuth'
import { newPizza, oldPizza, pizzaSizeDataRequest, pizzaSizeDataRequest2, pizzaCrustDataRequest, pizzaAdditionalOptionsRequest, pizzaOnMod, drinkSizeDataRequest, drinkOnMod, pizzaSelectedProps, pizzaPropOptions } from './inputData/itemModStoreTestInput'
import * as serverReq from '@/composables/serverRequests'
import {getItemData}  from '@/composables/serverRequests'
// let serverReq = require('@/composables/serverRequests')

const pinia = createPinia()
setActivePinia(pinia)
const itemModStore = useItemModificationStore();


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
  // useItemModificationStore = useItemModificationStore();
  // const itemModStore  = useItemModificationStore();
  // return itemModStore
}

// jest.mock(serverReq, () => ({
//   getItemData: jest.fn(val => {return val})
// }))

describe('Sanity check to see how a basic test works', () => {
  test("Sanity check", () => {
    expect(true).toBe(true);
  });
})

/*
describe('Testing mocking problem', () => {

  beforeEach(() => {
    setup()
    const itemModStore = useItemModificationStore();
    // let store = require('@/composables/serverRequests')
    // let myMock = jest.spyOn(store, 'getItemData')
    // let myMock = jest.spyOn(serverReq, 'getItemData')
    //   .mockImplementationOnce(() => { return pizzaSizeDataRequest })
    //   .mockImplementationOnce(() => { return pizzaCrustDataRequest })
    //   .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
    // return myMock
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('should be mocking api call', async() => {
    // const itemModStore = useItemModificationStore();
    // let store = require('@/composables/serverRequests')
    // let myMock = jest.spyOn(store, 'getItemData')
    let myMock = jest.spyOn(serverReq, 'getItemData')
    // jest.mock('@/composables/serverRequests')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
      
      // .mockImplementationOnce(() => Promise.resolve(pizzaSizeDataRequest))
      // .mockImplementationOnce(() => Promise.resolve(pizzaCrustDataRequest))
      // .mockImplementationOnce(() => Promise.resolve(pizzaAdditionalOptionsRequest))

      // jest.clearAllMocks();
    // console.log(myMock.mock)
    // await itemModStore.loadItem(oldPizza)
    await itemModStore.loadItem(newPizza)
    // console.log(myMock.mock)

    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });

  test('should be mocking api call 2', async() => {
    // const itemModStore = useItemModificationStore();
    // let store = require('@/composables/serverRequests')
    let myMock = jest.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
      // .mockImplementationOnce(() => Promise.resolve(pizzaSizeDataRequest))
      // .mockImplementationOnce(() => Promise.resolve(pizzaCrustDataRequest))
      // .mockImplementationOnce(() => Promise.resolve(pizzaAdditionalOptionsRequest))
      // jest.clearAllMocks();
      // console.log(myMock.mock)

    await itemModStore.loadItem(oldPizza)
    // console.log(myMock.mock)

    expect(itemModStore.itemOnMod).toMatchObject(oldPizza)
  });
});*/


describe('check if loadItem() loads the proper data', () => {
  beforeEach(() => {
    setup()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('itemOnMod should be empty in the beginning', () => {
    const itemModStore = useItemModificationStore();
    expect(itemModStore.itemOnMod).toBe(null)
  });

  test('itemOnMod should be a new item', async () => {
    const itemModStore = useItemModificationStore();
    
    jest.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })

    await itemModStore.loadItem(newPizza)
    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });

  test('new itemOnMod object should replace the old one', async () => {
    const itemModStore = useItemModificationStore();
    // expect.assertions(1) ???

    jest.spyOn(serverReq, 'getItemData')
    .mockImplementationOnce(() => { return pizzaSizeDataRequest })
    .mockImplementationOnce(() => { return pizzaCrustDataRequest })
    .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
    await itemModStore.loadItem(oldPizza)

    jest.spyOn(serverReq, 'getItemData')
    .mockImplementationOnce(() => { return pizzaSizeDataRequest })
    .mockImplementationOnce(() => { return pizzaCrustDataRequest })
    .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })
    await itemModStore.loadItem(newPizza)
    
    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });
})

describe('getAdditionalOptionsList(item) tests', () => {
    beforeEach(() => {
      setup()
    })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('pizza call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "pizzas",
    }

    jest.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })

    let res = await itemModStore.getAdditionalOptionsList(param)

    expect(res).toMatchObject(pizzaOnMod)
  });

  test('drinks call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "drinks",
    }

    jest.spyOn(serverReq, 'getItemData')
      .mockImplementationOnce(() => { return drinkSizeDataRequest })
    .mockImplementationOnce(() => { return crustData })
    .mockImplementationOnce(() => { return additionalOptions })
    let res = await itemModStore.getAdditionalOptionsList(param)

    expect(res).toMatchObject(drinkOnMod)
  });
});


describe('more and less items on modification', () => {
  beforeEach(() => {
    setup()
  })

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
  beforeEach(() => {
    setup()
  })

  test('should return the proper object', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.aggregatedProps.propOptions = pizzaPropOptions
    itemModStore.aggregatedProps.selectedProps = pizzaSelectedProps
    let res = itemModStore.getSelectedProps()

    let expectedRes = {
      crust: { name: 'thin', price: 0 },
      size: { price: 18, name: 'medium - 32 cm' }
    }

    expect(res).toMatchObject(expectedRes)
  });
});

// describe('getPropPrices test group', () => {
//   beforeEach(() => {
//     setup()
//   })

//   test('should return the approx. float', () => {
//     const itemModStore = useItemModificationStore();
//     itemModStore.aggregatedProps.selectedProps = pizzaSelectedProps
//     let res = itemModStore.getPropPrices()
//     let cb = jest.
//     fn()
//     .mockImplementationOnce(() => { return drinkSizeDataRequest })

//     expect(res).toBeCloseTo(18, 1);
//   });
// });
