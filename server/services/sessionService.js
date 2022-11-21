import { createSession, getSessionByAuthToken } from '~/server/database/repositories/sessionRepository.js'
import { v4 as uuidv4 } from 'uuid'
import { sanitiseUserForTheFrontend } from '~/server/services/userServices.js'

export async function makeSession(user, event) {
    const authToken = uuidv4().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
        return getUserBySessionToken(authToken)
    }
    throw Error('Error creating session')
}

export async function getUserBySessionToken(authToken) {
    const session = await getSessionByAuthToken(authToken)
    return sanitiseUserForTheFrontend(session.user)
}
