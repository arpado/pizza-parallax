import prisma from '~/server/database/client'

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            password: true,
        }
    })
}

export async function createUser(data) {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
        }
    })
    return user
}