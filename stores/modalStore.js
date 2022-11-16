import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => {
        return {
            showLogin: false,
            showBooking: false,
            showItemSetup: false,
        }
    },
    actions: {
        toggleLogin() {
            this.showBooking = false
            this.showItemSetup = false
            this.showLogin = !this.showLogin
        },
        toggleBooking() {
            this.showLogin = false
            this.showItemSetup = false
            this.showBooking = !this.showBooking
        },
        toggleItemSetup(item) {
            this.showLogin = false
            this.showBooking = false
            this.showItemSetup = !this.showItemSetup
        },
        closeModal() {
            this.showLogin = false
            this.showBooking = false
            this.showItemSetup = false
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