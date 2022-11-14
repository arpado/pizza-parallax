import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => {
        return {
            // showModal: false,
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
            console.log(item)
        },
        // openModal(content) {
        //     this.showModal = true
        //     this.modalContent = content
        // },
        closeModal() {
            // this.showModal = false
            // this.modalContent = null
            this.showLogin = false
            this.showBooking = false
            this.showItemSetup = false
        },
        closeModalOnEscape(e) {
            if (e.keyCode == 27) {
                // if (this.showMessage) {
                //     this.closeMessageModal();
                // } else if (this.showModal) {
                //     this.closeModal();
                // }

                // if (this.showLogin) {
                //     this.showLogin = false
                // }
                // if (this.showBooking) {
                //     this.showBooking = false
                // }
                this.closeModal()
            }
        },
        closeOnOutsideClick(e) {
            if (e.target.classList.contains('modal-container')) {
                // if (this.showMessage) {
                //     this.closeMessageModal();
                // } else if (this.showModal) {
                //     this.closeModal();
                // }
                this.closeModal()
            }
        },
    }
})