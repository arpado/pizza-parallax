// import { CompatibilityEvent } from 'h3'
import { sendError } from 'h3'
// import bcrypt from 'bcrypt'
import { validateUser } from '~/server/app/services/userService'
import { createUser } from '~/server/database/repositories/userRepository'
import { makeSession } from '~/server/app/services/sessionService.js'

export default async (CompatibilityEvent) => {
    const body = await useBody(CompatibilityEvent)
    const data = body.data

    const validation = await validateUser(data)

    if(validation.hasErrors === true) {
        const errors = JSON.stringify(Object.fromEntries(validation.errors))
        return sendError(CompatibilityEvent, createError({statusCode: 422, data: errors}))
    }
    
    // const encryptedPassword = await bcrypt.hash(data.password, 10)
    const encryptedPassword = data.password

    const userData = {
        name: data.name,
        email: data.email,
        password: encryptedPassword,
    }

    const user = await createUser(userData)

    return await makeSession(user, CompatibilityEvent)
}