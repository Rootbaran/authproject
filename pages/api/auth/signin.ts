import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

interface SignIN {
  email?: string
  username?: string
  password: string
}

async function getUserAndSession({ username, email, password }: SignIN) {

  const user = await prisma.user.findFirst(
    {
      where: {
        OR: [
          {
            username: username
          },
          {
            email: email
          }
        ],
        password: password
      },
      select: {
        id: true,
        username: true,
        email: true,
        posts: true
      }
    }
  )
  const session = await prisma.session.findFirst({
    where: {
      userId: user?.id
    },
  })
  return { user, session }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  const { username, email, password } = JSON.parse(req.body)
  const { user, session } = await getUserAndSession({ username, email, password })
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  console.log(user, session)
  res.status(200).json({ user: user, session: session })
}
