import { defineStore } from 'pinia'
import { postLoginForm, postSignOut, getUserData, updateUserData, updateProfileData } from '@/composables/userAuth'
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
            
            // ezt lehet, h kulon sajat store-ba kell
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
            this.user = null
            this.userId = null

            // ezt lehet, h kulon sajat store-ba kell
            this.orderHistory = []
        },
        async checkActiveUser() {
            if(window.localStorage.getItem('sb-qykublxyqkhmvdpnkezp-auth-token')) {
            let tokenData = window.localStorage.getItem('sb-qykublxyqkhmvdpnkezp-auth-token')
            let token = JSON.parse(tokenData)
            this.userId = token.user.id

            let userData = await getUserData(this.userId)
            
            this.user = new User(userData.data[0].first_name, userData.data[0].last_name, token.user.email, token.user.phone, userData.data[0].address, token.user.id)
            }
        },
        async updateUser(column, data, userId) {
            let table = this.getTable(column)

            if(table === 'profiles') {
                let res = await updateProfileData(column, data)
                return res
            }

            await updateUserData(table, column, data, userId)
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

        // ezt lehet, h kulon sajat store-ba kell
        async getUserOrderHistory() {
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
    }
})