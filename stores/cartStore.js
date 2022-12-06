import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      showCart: false,
      // orderArray
      itemOnOrder: [],
    }
  },
  getters: {
    totalPrice: (state) => {
      let totalArr = [];
      state.itemOnOrder.forEach(item => {
        totalArr.push(item.sumPrice);
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
    addToOrder(item) {
      // ha a keyek egyeznek, akkor adja elozohoz, amugy meg ujat csinal
      let itemFound = false
      this.itemOnOrder.forEach(elem => {
        // ide komplexebb validatort
        if (item.name === elem.name && item.size === elem.size) {
          elem.quantity += item.quantity;
          elem.sumPrice = elem.quantity * elem.price;
          itemFound = true
          return
        }
      })

      if (!itemFound && item.quantity > 0) {
        // ez atteve itemOnModra
        this.itemOnOrder.push(item)
      }
      console.log(this.itemOnOrder)
    },
    moreItem(index) {
      this.itemOnOrder[index].quantity++
      this.itemOnOrder[index].sumPrice = this.itemOnOrder[index].quantity * this.itemOnOrder[index].price;
    },
    lessItem(index) {
      if (this.itemOnOrder[index].quantity > 1) {
        this.itemOnOrder[index].quantity--
        this.itemOnOrder[index].sumPrice = this.itemOnOrder[index].quantity * this.itemOnOrder[index].price;
      }
    },
    deleteItem(name, size) {
      this.itemOnOrder = this.itemOnOrder.filter(elem => { return (elem.name !== name || elem.size !== size) })
    }
  },
})