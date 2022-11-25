import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    setCookie(event, 'auth_token', null)
    return {message: "You have been logged out!"}
})