// import { H3Event } from "h3"
// import bcrypt from 'bcrypt'
import { getUserByEmail } from '~/server/database/repositories/userRepository';
import { sendError } from "h3"
import { sanitizeUserForFrontend } from '~/server/app/services/userService';
import { makeSession } from '~/server/app/services/sessionService.js';

// import { ZodError } from "zod"
// import loginRequest from '~~/server/app/formRequests/LoginRequest';
// import sendDefaultErrorResponse from '~~/server/app/errors/responses/DefaultErrorsResponse';
// import { getMappedError } from '~~/server/app/errors/errorMapper';
// import sendZodErrorResponse from '~~/server/app/errors/responses/ZodErrorsResponse';


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const email = body.email
    const password = body.password
    const user = await getUserByEmail(email)
    // return user

    if (!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'User not found!' }))
    }

    if (!password) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Password must be given!' }))
    }

    // bcrypt is incompatible with build, hashing suspended for the time being!!!
    // const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    let isPasswordCorrect = Boolean
    if (password == user.password) {
        isPasswordCorrect = true
    } else {
        isPasswordCorrect = false
    }

    if (!isPasswordCorrect) {
        sendError(event, createError({ statusCode: 401, statusMessage: 'Wrong password!' }))
    }

    await makeSession(user, event)

    return sanitizeUserForFrontend(user)
})

// export default eventHandler(async (event) => {

//     try {
//       const data = await loginRequest(event)
//       const user = await getUserByEmail(data.usernameOrEmail)

//       if (user === null) {
//         return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
//       }

//       if (user.password == undefined) {
//         return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
//       }

//       const isPasswordCorrect = await bcrypt.compare(data.password, user.password)

//       if (!isPasswordCorrect) {
//         sendError(event, createError({ statusCode: 401, data: standardAuthError }))
//       }

//       await makeSession(user, event)
//       return sanitizeUserForFrontend(user)
//     } catch (error: any) {

//       if (error.data instanceof ZodError) {
//         return await sendZodErrorResponse(event, error.data)
//       }

//       return await sendDefaultErrorResponse(event, 'Unauthenticated', 401, error)
//     }
//   })


// for netlify

// export default defineEventHandler( async (event) => {

//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//     };
//     if (event.httpMethod === "OPTIONS") {
//       return {
//         statusCode: 200,
//         headers,
//         body: JSON.stringify({ message: "Successful preflight call." }),
//       };
//     } else
//      if (event.httpMethod === "POST") {
//         // defineEventHandler(async (event) => {
//             const body = await readBody(event)
//             const email = body.email
//             const password = body.password
//             const user = await getUserByEmail(email)
//             // return user
        
//             if (!user) {
//                 return sendError(event, createError({ statusCode: 401, statusMessage: 'User not found!' }))
//             }
        
//             if (!password) {
//                 return sendError(event, createError({ statusCode: 401, statusMessage: 'Password must be given!' }))
//             }
        
//             // const isPasswordCorrect = bcrypt.compareSync(password, user.password)
//             let isPasswordCorrect = Boolean
//             if (password == user.password) {
//                 isPasswordCorrect = true
//             } else {
//                 isPasswordCorrect = false
//             }
        
//             if (!isPasswordCorrect) {
//                 sendError(event, createError({ statusCode: 401, statusMessage: 'Wrong password!' }))
//             }
        
//             await makeSession(user, event)
        
//             return sanitizeUserForFrontend(user)
//         // })
//     }
//   })