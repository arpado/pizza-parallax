import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { doesUserExist, validateUser } from '../../services/userServices'
import { createUser } from '~~/prisma/database/userRepository'
import { makeSession } from '~~/server/services/sessionService'

export default async (CompatibilityEvent) => {
    const body = await useBody(CompatibilityEvent)
    // const name = body.name
    // const email = body.email
    // const password = body.password
    const data = body.data

    const userExists = await doesUserExist(email)

    if (userExists.value === true) {
        sendError(CompatibilityEvent, createError({ statusCode: 422, statusMessage: userExists.message }))
    }

    const validation = await validateUser(data)

    if(validation.hasErrors === true) {
        const errors = JSON.stringify(Object.fromEntries(validation.errors))
        return sendError(event, createError({statusCode: 422, data: errors}))
    }


    const encryptedPassword = await bcrypt.hash(password, 10)

    const userData = {
        name,
        email,
        password: encryptedPassword,
    }

    const user = await createUser(userData)

    return await makeSession(user, CompatibilityEvent)
}

// export default async (event) => {
//     const body = await useBody(event)
//     const data = body.data
//     return data
// }