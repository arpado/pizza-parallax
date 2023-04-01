import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'pinia'
import { useUserStore } from './userStore'
import { sendOrderData } from '@/composables/serverRequests'
import { useItemModificationStore } from './itemModificationStore'
import { useModalStore } from './modalStore'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      itemOnOrder: [],
      lockedOrder: [],
      lockedOrderID: null,
      sentOrderID: null,
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
    },
    ...mapState(useUserStore, ['userId']),
  },
  actions: {
    // checks if array A equlas array B
    checkSelectedOptions(a, b) {
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    },
    // if the item with its exact optional settings is already on the list adds one the the counter, otherwise adds the item to the list 
    addToCart() {
      const itemModStore = useItemModificationStore()
      const modalStore = useModalStore()
      let item = itemModStore.createItem()
      let itemFound = false

      this.itemOnOrder.forEach(elem => {
        // ide komplexebb validatort
        if (item.name === elem.name && item.size === elem.size && this.checkSelectedOptions(item.selectedOptions, elem.selectedOptions)) {
          elem.quantity += item.quantity;
          elem.sumPrice = elem.quantity * elem.price;
          itemFound = true
          modalStore.closeModal();
          useNuxtApp().$toast.success(`Added to cart!`);
          return
        }
      })

      if (!itemFound && item.quantity > 0) {
        item.orderUnitId = uuidv4();
        this.itemOnOrder.push(item)
        modalStore.closeModal();
        useNuxtApp().$toast.success(`Added to cart!`);
      } else {
        useNuxtApp().$toast.error(`Something went wrong!`) 
        console.warn('Error in addToOrder()')
      } 
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
    },
    lockOrder() {
      this.lockedOrder = this.itemOnOrder
      this.lockedOrderID = uuidv4();
    },
    // calls the API function from the serverRequests.js
    // !!! a uuid should be given as a ID for each order, maybe on the end of addToOrder, then should be sent back here from the server, and put in a var, and get this checked for === before sending to make sure no multi-sending the same order is possible
    async sendOrder() {
      if (!this.userId) {
        useNuxtApp().$toast.error(`You have to log in first!`) 
        console.warn('No user found!')
        return
      }
      if (this.lockedOrderID === this.sentOrderID) {
        useNuxtApp().$toast.error(`This order has already been sent!`) 
        console.warn('This order has already been sent!')
        return
      }
      
      // if (this.userId && ) {
        let error = await sendOrderData(this.lockedOrder, this.userId)
        if (error) {
          useNuxtApp().$toast.error(`Something went wrong!<br>${error}`, {dangerouslyHTMLString: true}) 
          console.error(error)
        } else {
        useNuxtApp().$toast.success(`Your order has been sent!`);
          this.sentOrderID = this.lockedOrderID
        }
      // } else {
      // }
    },
  },
})