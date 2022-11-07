import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
      showCart: true,
      pizzaOnOrder: [],
    }),
    getters: {
      // showCart(cartState) => {
      //   return cartState
      // },
      // cart: (state) => {return state.showCart},
    },
    actions: {
      toggleCart() {
        this.showCart = !this.showCart
        console.log(this.showCart)
      },
      addToOrder(pizza) {
        this.pizzaOnOrder.push(pizza)
        console.log(this.pizzaOnOrder)
      },
    },
  })