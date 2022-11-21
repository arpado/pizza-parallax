import prisma from '~/prisma/client'

export async function createSession(data) {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken
    }
  })
}

export async function getSessionByAuthToken(authToken) {
  const user = await getUserByAuthToken(authToken)
  return { authToken, user }
}

async function getUserByAuthToken(authToken) {
  return prisma.session.findUnique({
    where: {
      authToken: authToken,
    }
  }).user()
}