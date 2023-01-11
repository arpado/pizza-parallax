import { defineStore } from 'pinia'
import { getUser } from '@/composables/userAuth'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null,
        }
    },
    actions: {
        async getUserFromDB() {
            return await getUser(this.user.id)
        }
    }
})