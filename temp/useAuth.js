import { useRouter, useState } from '#app'
// import useErrorMapper from "./useErrorMapper";
import { useUserStore } from '~/stores/userStore'
// const user = useUserStore.user

export const useAuthCookie = () => useCookie('auth_token')

export async function useUser() {
    const authCookie = useAuthCookie().value
    const user = useState('user')

    if (authCookie && !user.value) {
        const cookieHeaders = useRequestHeaders(['cookie'])
        const { data } = await useFetch(`/api/auth/getByAuthToken`, {
            headers: cookieHeaders,
        })
        user.value = data.value
    }
    return user.value
}

export async function userLogout() {
    const data = await useFetch('/api/auth/logout')
    useState('user').value = null
    await useRouter().push('/')
    return data
}

export async function registerWithEmail(name, email, password) {
    try {
        const { data, error, refresh } = await useFetch('api/auth/register', {
            method: 'POST',
            body: { data: {name, email, password },
            // initialCache: false 
            }
        })
        console.log(data)
        // return 
        refresh()

        if (error.value) {
            const errorData = error.value
            const errors = errorData.data
            const res = JSON.parse(errors.data)
            const errorMap = new Map(Object.entries(res))
        
            return { hasErrors: true, errors: errorMap }
        }

        if (data) {
            useState('user').value = data
            await useRouter().push('/')
        }

        return { hasErrors: false, loggedIn: true }

    } catch (error) {
        console.log('Something went wrong: ' + error.toString())
    }
}

export async function loginWithEmail(email, password) {
    try {
      const { data, error } = await useFetch(`/api/auth/login`, { method: 'POST', body: { email: email, password: password }, initialCache: false })
  
    //   if (!data?.id) {
    //     throw Error('Something went wrong: no id found!')
    //   }

      if(error.value) {
          console.log(error.value.data.statusMessage)
        //   return error.value.data.statusMessage
        return { hasError: true, loggedIn: false, errorMessage: error.value.data.statusMessage }
      }

    //   if (error.value) {
    //     const errorData = error.value
    //     const errors = errorData.data
    //     const res = JSON.parse(errors.data)
    //     const errorMap = new Map(Object.entries(res))
    //     return { hasErrors: true, errors: errorMap }
    // }

    //   console.log(data)

      useState('user').value = data
      await useRouter().push('/')

    //   const { data, pending, error, refresh } = await useFetch()
    //   const loadPost = () => {
    //     refresh()
    //   }
      
  
      return { hasError: false, loggedIn: true }
    } catch (error) {
        console.log(error)
    //   return useErrorMapper(error.data.data)
    }
  }