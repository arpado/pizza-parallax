import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => {
        return {
            modalList: {
                showLogin: false,
                showBooking: false,
                showItemSetup: false,
                showCart: false,
            }
        }
    },
    actions: {
        openModal(selectedModal) {
            this.modalList[selectedModal] = true
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