export const newPizza = {
    description: "Tomato, Parmigiano Reggiano, tuna, olives, garlic, capers, onion, and hot Calabrian chili peppers",
    id: 13,
    table: "pizzas",
    image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
    name: "Calabrese",
    price: 15,
    size: 1,
}

export const oldPizza = {
    description: "Tomato, mozarella and basil",
    id: 1,
    table: "pizzas",
    image: "https://qykublxyqkhmvdpnkezp.supabase.co/storage/v1/object/public/test-bucket/pizza-ready-cropped.jpg",
    name: "Margharita",
    price: 10,
    size: 1,
}

export const pizzaSizeDataRequest = {
    error: null,
    data: [
        { price: 15, size: { name: 'small - 28 cm' } },
        { price: 18, size: { name: 'medium - 32 cm' } },
        { price: 20, size: { name: 'large - 36 cm' } },
        { price: 25, size: { name: 'extra large - 45 cm' } }
    ],
    count: null,
    status: 200,
    statusText: 'OK'
}
export const pizzaSizeDataRequest2 = {
  error: null,
  data: [
      { price: 15, size: { name: 'small - 28 cm' } },
      { price: 18, size: { name: 'medium - 32 cm' } },
      { price: 20, size: { name: 'large - 36 cm' } },
      { price: 25, size: { name: 'extra large - 45 cm' } }
  ],
  count: null,
  status: 200,
  statusText: 'OK'
}

export const pizzaCrustDataRequest = {
    error: null,
    data: [
        { name: 'normal', price: 0 },
        { name: 'thin', price: 0 },
        { name: 'thick', price: 0.5 },
        { name: 'thick, filled with cheese', price: 1 }
    ],
    count: null,
    status: 200,
    statusText: 'OK'
}

export const pizzaAdditionalOptionsRequest = {
    error: null,
    data: [
      { name: 'anchovies', price: 15 },
      { name: 'artichokes', price: 10 },
      { name: 'brokkoli', price: 10 },
      { name: 'cheese', price: 5 },
      { name: 'ham', price: 15 },
      { name: 'mushroom', price: 10 },
      { name: 'salami', price: 15 }
    ],
    count: null,
    status: 200,
    statusText: 'OK'
  }

export const pizzaOnMod = {
    propOptions: {
      size: {
        name: "size",
        description: "Select pizza size",
        data: [
          { price: 15, name: 'small - 28 cm' },
          { price: 18, name: 'medium - 32 cm' },
          { price: 20, name: 'large - 36 cm' },
          { price: 25, name: 'extra large - 45 cm' }
        ],
      },
      crust: {
        name: "crust",
        description: "Select pizza crust",
        data: [
          { name: 'normal', price: 0 },
          { name: 'thin', price: 0 },
          { name: 'thick', price: 0.5 },
          { name: 'thick, filled with cheese', price: 1 }
        ],
      },
    },
    selectedProps: {
      size: "medium - 32 cm",
      crust: "thin",
    },
    additionalOptions: [
      {
        title: 'Toppings',
        data: [
          { name: 'anchovies', price: 15 },
          { name: 'artichokes', price: 10 },
          { name: 'brokkoli', price: 10 },
          { name: 'cheese', price: 5 },
          { name: 'ham', price: 15 },
          { name: 'mushroom', price: 10 },
          { name: 'salami', price: 15 }
        ]
      }
    ]
  }

  export const drinkSizeDataRequest = {
    error: null,
    data: [
      {price: 5, name: 'small - 0.33 l'},
      {price: 5, name: 'small - 0.33 l'},
      {price: 10, name: 'medium - 0.5 l'},
      {price: 10, name: 'medium - 0.5 l'},
      {price: 12, name: 'large - 1 l'},
      {price: 12, name: 'large - 1 l'}
    ],
    count: null,
    status: 200,
    statusText: 'OK'
  }

  export const drinkOnMod = {
    propOptions: {
      size: {
        name: "size",
        description: "Select drink size",
        data: [
          {price: 5, name: 'small - 0.33 l'},
          {price: 5, name: 'small - 0.33 l'},
          {price: 10, name: 'medium - 0.5 l'},
          {price: 10, name: 'medium - 0.5 l'},
          {price: 12, name: 'large - 1 l'},
          {price: 12, name: 'large - 1 l'}
        ],
      },
    },
    selectedProps: {
      size: "small - 0.33 l",
    },
  }

  export const pizzaSelectedProps = {
    crust: "thin",
    size: "medium - 32 cm"
  }

  export const pizzaPropOptions = {
    size: {
      name: "size",
      description: "Select pizza size",
      data: [
        { price: 15, name: 'small - 28 cm' },
        { price: 18, name: 'medium - 32 cm' },
        { price: 20, name: 'large - 36 cm' },
        { price: 25, name: 'extra large - 45 cm' }
      ],
    },
    crust: {
      name: "crust",
      description: "Select pizza crust",
      data: [
        { name: 'normal', price: 0 },
        { name: 'thin', price: 0 },
        { name: 'thick', price: 0.5 },
        { name: 'thick, filled with cheese', price: 1 }
      ],
    }
  }