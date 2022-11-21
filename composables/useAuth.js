import { useRouter, useState } from '#app'
// import useErrorMapper from "./useErrorMapper";

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
    await useFetch('/api/auth/logout')
    useState('user').value = null
    await useRouter().push('/')
}

export async function registerWithEmail(name, email, password) {
    try {
        const data = await useFetch('api/auth/register', {
            method: 'POST',
            body: { data: {name, email, password } }
        })

        // return data

        if (data) {
            useState('user').value = data
            await useRouter().push('/')
        }
        return { hasErrors: false, loggedIn: true }

        // if(error.value) {
        //     const errorData = error.value
        //     const errors = errorData.data
        //     const res = JSON.parse(errors)
        //     const errorMap = new Map(Object.entries(res))
        //     return { hasErrors: true, errors: errorMap }
        // }
        
        // if (res) {
        //     useState('user').value = res
        //     await useRouter().push('/')
        // }
    } catch (error) {
        console.log('Somthing went wrong: ' + error.toString())
    }
}

// export async function loginWithEmail(usernameOrEmail, password) {
//     try {
//       const result =  await $fetch('api/auth/login', { method: 'POST', body: { usernameOrEmail: usernameOrEmail, password: password } })
  
//       if (!result?.id) {
//         throw Error('something went wrong')
//       }
//       useState('user').value = result
//       await useRouter().push('/')
  
//       return { hasErrors: false, loggedIn: true }
//     } catch (error) {
//     //   return useErrorMapper(error.data.data)
//     }
//   }
export async function loginWithEmail(usernameOrEmail, password) {
    try {
      const result = await useFetch(`/api/auth/login`, { method: 'POST', body: { usernameOrEmail: usernameOrEmail, password: password } })
  
      if (!result?.id) {
        throw Error('something went wrong')
      }
      useState('user').value = result
      await useRouter().push('/')
  
      return { hasErrors: false, loggedIn: true }
    } catch (error) {
    //   return useErrorMapper(error.data.data)
    }
  }

// export async function registerWithEmail(name, email, password) {
//     try {
//         const res = await $fetch('api/auth/register', {
//             method: 'POST',
//             body: { name, email, password }
//         })
//         if (res) {
//             useState('user').value = res
//             await useRouter().push('/')
//         }
//     } catch (error) {
//         console.log('Somthing went wrong: ' + error.toString())
//     }
// }