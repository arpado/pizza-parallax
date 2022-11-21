import { getUserByEmail } from '~/prisma/database/userRepository'

export async function validate(data) {
    const errors = new Map()
    for (const [key, value] of Object.entries(data)) {
        let val = await runChecks(key, value)

        if(val.hasError) {
            errors.set(key, { 'check': val })
        }
    }
    return errors
}

async function runChecks(key, value) {
    const check = {
        value,
        isBlank: false,
        lenghtMin8: true,
        key,
        hasError: false,
    }
    if (key == 'password') {
        if (value.length < 8) {
            check.hasError = true
            check.errorMessage = `password must be at least 8 characters`
        }
        check.lenghtMin8 = false
    }

    if (key == 'email') {
        const isValidEmail = validateEmail(value)

        if(!isValidEmail) {
            check.emailTaken = true
            check.hasError = true
            check.errorMessage = `Email ${value} is invalid`
            return check
        }

        const email = await getUserByEmail(value)

        if (email) {
            check.emailTaken = true
            check.hasError = true
            check.errorMessage = `Email is invalid or already taken`
        }
    }

    // if (key == 'username') {
    //     const username = await getUserByUserName(value)
    //     if (username) {
    //         check.usernameTaken = true
    //         check.hasError = true
    //         check.errorMessage = `Username is invalid or already taken`
    //     }
    // }

    return check
}

function validateEmail(input) {
    const validRegex = /^[a-zA-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*S/
    if (!input.match(validRegex)) {
        return false
    }
    return true
}