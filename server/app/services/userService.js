import { validate } from '~/server/app/services/validate'

export async function validateUser(data) {
    const errors = await validate(data)

    if(errors.size > 0) {
        return { hasErrors: true, errors }
    }
    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user) {
    if (!user) {
        return user
    }

    delete user.password

    return user
}