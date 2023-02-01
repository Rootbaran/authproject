import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

interface SignUp {
  email: string
  username: string
  password: string
}

async function createUser({ username, email, password }: SignUp) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
    select: {
      id: true,
      username: true,
      email: true,
      posts: true
    }
  })
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expires: new Date(Date.now()),
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
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
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Bad request' })
    return
  }
  const { user, session } = await createUser({ username, email, password })
  if (!user || !session) {
    res.status(404).json({ message: 'User or session not found' })
    return
  }
  res.status(200).json({ user: user, session: session })
}
