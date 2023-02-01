import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'


async function getUserAndSession({ token }: { token: string }) {
  const session = await prisma.session.findUnique({
    where: {
      token: token,
    },
  })
  const user = await prisma.user.findUnique({
    where: {
      id: session?.userId as string,
    },
    select: {
      id: true,
      username: true,
      email: true,
      posts: true
    }
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
  const { token } = JSON.parse(req.body)
  if (!token) {
    res.status(400).json({ message: 'Bad request' })
    return
  }
  const { user, session } = await getUserAndSession({ token })
  if (!user || !session) {
    res.status(404).json({ message: 'User or session not found' })
    return
  }
  res.status(200).json({ user: user, session: session })
}
