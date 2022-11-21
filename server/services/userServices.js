// import { getUserByEmail } from '~/prisma/database/userRepository'
import { validate } from '~/server/services/validate.js'

// export async function doesUserExist(email) {
//     const hasEmail = await getUserByEmail(email)
//     const emailExists = hasEmail !== null

//     const errors = {}

//     if (emailExists) {
//         errors.emailError = `This email: ${email} already registered!`
//     }

//     if (emailExists) {
//         const message = JSON.stringify(errors)
//         return { value: true, message }
//     }

//     return { value: false }
// }
export async function validateUser(data) {
    const errors = await validate(data)

    if(errors.size > 0) {
        return { hasErrors: true, errors }
    }
    return { hasErrors: false }
}

export function sanitiseUserForTheFrontend(user) {
    if (!user) {
        return user
    }

    delete user.password

    return user
}