import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => {
        return {
            // showLogin: false,
            // showBooking: false,
            // showItemSetup: false,
            // showCart: false,
            modalList: {
                showLogin: false,
                showBooking: false,
                showItemSetup: false,
                showCart: false,
            }
        }
    },
    actions: {
        // toggleLogin() {
        //     this.showBooking = false
        //     this.showItemSetup = false
        //     this.showLogin = !this.showLogin
        // },
        // toggleBooking() {
        //     this.showLogin = false
        //     this.showItemSetup = false
        //     this.showBooking = !this.showBooking
        // },
        // toggleItemSetup(item) {
        //     this.showLogin = false
        //     this.showBooking = false
        //     this.showItemSetup = !this.showItemSetup
        // },
        openModal(showModal) {
            this.modalList[showModal] = true
        },
        closeModal() {
            this.modalList.showLogin = false
            this.modalList.showBooking = false
            this.modalList.showItemSetup = false
            this.modalList.showCart = false
            // this.modalList.forEach(modal => {
            //     modal = false
            // })
        },
        closeModalOnEscape(e) {
            if (e.keyCode == 27) {
                this.closeModal()
            }
        },
        closeOnOutsideClick(e) {
            if (e.target.classList.contains('modal-container')) {
                this.closeModal()
            }
        },
    }
})