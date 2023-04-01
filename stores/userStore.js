import { defineStore } from 'pinia'
import { postLoginForm, postSignOut, getUserData, updateUserData, updateProfileData, deleteProfileData } from '@/composables/userAuth'
import { getOrderHistory } from '@/composables/serverRequests'
import { useModalStore } from './modalStore'

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
        // TODO:login should save userdata into localstorage in order to save api calls for the userdata if user is logged in
        // then if data changes, refresh localstorage
        // then if logout, delete user data from storage
        async login(email, password) {
            const modalStore = useModalStore()

            try {
                let loginData = await postLoginForm(email, password)
                this.userId = loginData.data.user.id
                let userData = await getUserData(this.userId)

                this.user = new User(userData.data[0].first_name, userData.data[0].last_name, loginData.data.user.email, loginData.data.user.phone, userData.data[0].address, loginData.data.user.id)

                useNuxtApp().$toast.success(`Login successful!<br/>Welcome back ${this.user.firstName}!`, { dangerouslyHTMLString: true });
                modalStore.closeModal();
            } catch (error) {
                useNuxtApp().$toast.error(`Login failed!`);
            }

            // return loginData
        },
        async logout() {
            let { error } = await postSignOut()

            if (error === null) {
                useNuxtApp().$toast.success(`Logout successful!<br/>Have a nice day, ${this.user.firstName}!`, { dangerouslyHTMLString: true });
                this.clearUserData()
            } else {
                useNuxtApp().$toast.error('Logout failed!');
            }
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
            let res;
            // console.log(table, column, data, userId)

            if (table === 'users') {
                res = await updateUserData(column, data)
            } else if (table === 'profiles') {
                res = await updateProfileData(table, column, data, userId)
            }

            if (res.status === 204) {
                useNuxtApp().$toast.success(`Changes saved!`)
            } else {
                useNuxtApp().$toast.error(`Changes have not been saved!<br>${res.error.message}`, { dangerouslyHTMLString: true });
            }
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

            if (error) {
                useNuxtApp().$toast.error(`Something went wrong!`);
                return
            }

            data.forEach(elem => {
                let index = this.orderHistory.findIndex(item => elem.order_item_id === item.order_item_id)
                if (index !== -1) {
                    this.orderHistory[index].item_option = this.orderHistory[index].item_option.concat(', ', elem.item_option)
                } else {
                    this.orderHistory.push(elem)
                }
            })

 
        },
        // helper function to get the correct table for each type of data 
        // (custom data, like name and address are in the 'users' table, the auth data like email, password, phone, etc are in the supabase-built-in 'profiles' table) 
        getTable(column) {
            switch (column) {
                case 'first_name':
                case 'last_name':
                case 'address':
                    return 'profiles'
                    break;
                case 'email':
                case 'phone':
                    return 'users'
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