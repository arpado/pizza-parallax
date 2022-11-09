import { defineStore } from 'pinia'

class Pizza {
  constructor(name, size, quantity, price) {
    this.name = name;
    this.size = size;
    this.quantity = quantity;
    this.price = price;
    this.sumPrice = this.quantity * this.price;
  }
}

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      showCart: true,
      pizzaOnOrder: [],
    }
  },
  getters: {
    totalPrice: (state) => {
      let totalArr = [];
      state.pizzaOnOrder.forEach(pizza => {
        totalArr.push(pizza.sumPrice);
      })
      return totalArr.reduce(
        (total, sumPrice) => total + sumPrice,
        0).toFixed(2)
    }
  },
  actions: {
    toggleCart() {
      this.showCart = !this.showCart
    },
    addToOrder(name, size, quantity, price) {
      let pizzaFound = false
      this.pizzaOnOrder.forEach(item => {
        if (item.name === name && item.size === size) {
          item.quantity += quantity;
          item.sumPrice = item.quantity * item.price;
          pizzaFound = true
          return
        }
      })

      if (!pizzaFound && quantity > 0) {
        this.pizzaOnOrder.push(new Pizza(name, size, quantity, price))
      }
    },
    morePizza(index) {
      this.pizzaOnOrder[index].quantity++
      this.pizzaOnOrder[index].sumPrice = this.pizzaOnOrder[index].quantity * this.pizzaOnOrder[index].price;

    },
    lessPizza(index) {
      if (this.pizzaOnOrder[index].quantity > 0) {
        this.pizzaOnOrder[index].quantity--
        this.pizzaOnOrder[index].sumPrice = this.pizzaOnOrder[index].quantity * this.pizzaOnOrder[index].price;

      }
    },
    deletePizza(name, size) {
      this.pizzaOnOrder = this.pizzaOnOrder.filter(elem => { return (elem.name !== name || elem.size !== size) })
    }
  },
})