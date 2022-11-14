import { defineStore } from 'pinia';

export const useItemModificationStore = defineStore('itemModification', {
    state: () => {
        return {
            itemOnMod: null,
        }
    },
    actions: {
        loadItem(item) {
            this.itemOnMod = item
        },
        modifyItem() {
            // add additional keys to object

        },
    }
})