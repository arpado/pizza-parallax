import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia, defineStore } from 'pinia'
import { useItemModificationStore } from '@/stores/itemModificationStore'
import { registerWithEmail, postLoginForm } from '@/composables/userAuth'
  import { newPizza, oldPizza, pizzaSizeDataRequest, pizzaCrustDataRequest, pizzaAdditionalOptionsRequest, pizzaOnMod, drinkSizeDataRequest, drinkOnMod, pizzaSelectedProps, pizzaPropOptions } from './inputData/itemModStoreTestInput'

// const testUser = new OrderItemClassInstance(
//     "name",
//     1,
//     "test_type",
//     "test_propSelectors",
//     "test_props",
//     "test_selectedOptions",
//     1,
//     10,
// )

// let useItemModificationStore = undefined;
// const newPizza = {
//   description: "Tomato, Parmigiano Reggiano, tuna, olives, garlic, capers, onion, and hot Calabrian chili peppers",
//   id: 13,
//   table: "pizzas",
//   image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
//   name: "Calabrese",
//   price: 15,
//   size: 1,
// }

// const oldPizza = {
//   description: "Tomato, mozarella and basil",
//   id: 1,
//   table: "pizzas",
//   image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
//   name: "Margharita",
//   price: 10,
//   size: 1,
// }

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  // useItemModificationStore = useItemModificationStore();
  // const itemModStore  = useItemModificationStore();
  // return itemModStore
}


describe('Sanity check to see how a basic test works', () => {
  test("Sanity check", () => {
    expect(true).toBe(true);
  });

})


describe('check if loadItem loads the proper data', () => {
  beforeEach(() => {
    setup()
  })

  // afterEach(() => {
  //   itemModStore.$reset()
  // })

  test('itemOnMod should be empty in the beginning', () => {
    const itemModStore = useItemModificationStore();
    expect(itemModStore.itemOnMod).toBe(null)
  });

  test('itemOnMod should be a new item', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.loadItem(newPizza)
    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });

  test('new itemOnMod object should replace the old one', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.loadItem(oldPizza)
    itemModStore.loadItem(newPizza)
    expect(itemModStore.itemOnMod).toMatchObject(newPizza)
  });

  test('itemOnMod quantity should change', () => {
    const itemModStore = useItemModificationStore();
    itemModStore.loadItem(oldPizza)
    itemModStore.loadItem(newPizza)
  });
})

describe('getAdditionalOptionsList(item) tests', () => {
  beforeEach(() => {
    setup()
  })

  // let sizeData = {
  //   error: null,
  //   data: [
  //     { price: 15, size: { name: 'small - 28 cm' } },
  //     { price: 18, size: { name: 'medium - 32 cm' } },
  //     { price: 20, size: { name: 'large - 36 cm' } },
  //     { price: 25, size: { name: 'extra large - 45 cm' } }
  //   ],
  //   count: null,
  //   status: 200,
  //   statusText: 'OK'
  // }

  // let crustData = {
  //   error: null,
  //   data: [
  //     { name: 'normal', price: 0 },
  //     { name: 'thin', price: 0 },
  //     { name: 'thick', price: 0.5 },
  //     { name: 'thick, filled with cheese', price: 1 }
  //   ],
  //   count: null,
  //   status: 200,
  //   statusText: 'OK'
  // }

  // let additionalOptions = {
  //   error: null,
  //   data: [
  //     { name: 'anchovies', price: 15 },
  //     { name: 'artichokes', price: 10 },
  //     { name: 'brokkoli', price: 10 },
  //     { name: 'cheese', price: 5 },
  //     { name: 'ham', price: 15 },
  //     { name: 'mushroom', price: 10 },
  //     { name: 'salami', price: 15 }
  //   ],
  //   count: null,
  //   status: 200,
  //   statusText: 'OK'
  // }

  // let result = {
  //   propOptions: {
  //     size: {
  //       name: "size",
  //       description: "Select pizza size",
  //       data: [
  //         { price: 15, name: 'small - 28 cm' },
  //         { price: 18, name: 'medium - 32 cm' },
  //         { price: 20, name: 'large - 36 cm' },
  //         { price: 25, name: 'extra large - 45 cm' }
  //       ],
  //     },
  //     crust: {
  //       name: "crust",
  //       description: "Select pizza crust",
  //       data: [
  //         { name: 'normal', price: 0 },
  //         { name: 'thin', price: 0 },
  //         { name: 'thick', price: 0.5 },
  //         { name: 'thick, filled with cheese', price: 1 }
  //       ],
  //     },
  //   },
  //   selectedProps: {
  //     size: "medium - 32 cm",
  //     crust: "thin",
  //   },
  //   additionalOptions: [
  //     {
  //       title: 'Toppings',
  //       data: [
  //         { name: 'anchovies', price: 15 },
  //         { name: 'artichokes', price: 10 },
  //         { name: 'brokkoli', price: 10 },
  //         { name: 'cheese', price: 5 },
  //         { name: 'ham', price: 15 },
  //         { name: 'mushroom', price: 10 },
  //         { name: 'salami', price: 15 }
  //       ]
  //     }
  //   ]
  // }

  test('pizza call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "pizzas",
    }
    let cb = jest.
      fn()
      .mockImplementationOnce(() => { return pizzaSizeDataRequest })
      .mockImplementationOnce(() => { return pizzaCrustDataRequest })
      .mockImplementationOnce(() => { return pizzaAdditionalOptionsRequest })

    let res = await itemModStore.getAdditionalOptionsList(param, cb)

    expect(res).toMatchObject(pizzaOnMod)
    // getAdditionalOptionsList(item)

  });

  // let drinkSizeData = {
  //   error: null,
  //   data: [
  //     {price: 5, name: 'small - 0.33 l'},
  //     {price: 5, name: 'small - 0.33 l'},
  //     {price: 10, name: 'medium - 0.5 l'},
  //     {price: 10, name: 'medium - 0.5 l'},
  //     {price: 12, name: 'large - 1 l'},
  //     {price: 12, name: 'large - 1 l'}
  //   ],
  //   count: null,
  //   status: 200,
  //   statusText: 'OK'
  // }

  // let resultDrinks = {
  //   propOptions: {
  //     size: {
  //       name: "size",
  //       description: "Select drink size",
  //       data: [
  //         {price: 5, name: 'small - 0.33 l'},
  //         {price: 5, name: 'small - 0.33 l'},
  //         {price: 10, name: 'medium - 0.5 l'},
  //         {price: 10, name: 'medium - 0.5 l'},
  //         {price: 12, name: 'large - 1 l'},
  //         {price: 12, name: 'large - 1 l'}
  //       ],
  //     },
  //   },
  //   selectedProps: {
  //     size: "small - 0.33 l",
  //   },
  // }

  test('drinks call should return the proper object', async () => {
    const itemModStore = useItemModificationStore();
    let param = {
      table: "drinks",
    }
    let cb = jest.
      fn()
      .mockImplementationOnce(() => { return drinkSizeDataRequest })
      // .mockImplementationOnce(() => { return crustData })
      // .mockImplementationOnce(() => { return additionalOptions })

    let res = await itemModStore.getAdditionalOptionsList(param, cb)

    expect(res).toMatchObject(drinkOnMod)
    // getAdditionalOptionsList(item)
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
      crust: {name: 'thin', price: 0},
      size: {price: 18, name: 'medium - 32 cm'}
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
