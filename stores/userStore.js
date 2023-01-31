import { defineStore } from 'pinia'
import { postLoginForm, postSignOut, getUserData, updateUserData, updateProfileData, deleteProfileData } from '@/composables/userAuth'
import { getOrderHistory } from '@/composables/serverRequests'

class User {
    constructor(firstName, lastName, email, phone, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null,
            userId: null,
            orderHistory: [],
        }
    },
    actions: {
        async login(email, password) {
            let loginData = await postLoginForm(email, password)
            this.userId = loginData.data.user.id
            let userData = await getUserData(this.userId)

            this.user = new User(userData.data[0].first_name, userData.data[0].last_name, loginData.data.user.email, loginData.data.user.phone, userData.data[0].address, loginData.data.user.id)
        },
        async logout() {
            await postSignOut()
            this.clearUserData()
        },
        async checkActiveUser() {
            if (window.localStorage.getItem('sb-qykublxyqkhmvdpnkezp-auth-token')) {
                let tokenData = window.localStorage.getItem('sb-qykublxyqkhmvdpnkezp-auth-token')
                let token = JSON.parse(tokenData)
                this.userId = token.user.id

                let userData = await getUserData(this.userId)

                this.user = new User(userData.data[0].first_name, userData.data[0].last_name, token.user.email, token.user.phone, userData.data[0].address, token.user.id)
            }
        },
        // Updates the user, has to be broken into two, because supabase has a different method for updating auth schema
        async updateUser(column, data, userId) {
            let table = this.getTable(column)

            if (table === 'profiles') {
                let res = await updateProfileData(column, data)
                return res
            }

            await updateUserData(table, column, data, userId)
        },

        // deletes user
        // REMOVED FOR NOW, should be called in supabase for security reasons
        // async deleteUser() {
        //     let { error } = await deleteProfileData(this.userId)
        //     console.log(error)
        // },

        // Get the previous orders of the user
        async getUserOrderHistory() {
            this.orderHistory = []
            let { data, error } = await getOrderHistory(this.userId)

            data.forEach(elem => {
                let index = this.orderHistory.findIndex(item => elem.order_item_id === item.order_item_id)
                if (index !== -1) {
                    this.orderHistory[index].item_option = this.orderHistory[index].item_option.concat(', ', elem.item_option)
                } else {
                    this.orderHistory.push(elem)
                }
            })
        },
        getTable(column) {
            switch (column) {
                case 'firstName':
                case 'lastName':
                case 'address':
                    return 'users'
                    break;
                case 'email':
                case 'phone':
                    return 'profiles'
                    break;
                default:
                    break;
            }
        },
        clearUserData() {
            this.user = null
            this.userId = null
            this.orderHistory = []
        },
    }
})