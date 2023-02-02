import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

async function getSession2User(session: string) {
  const sess = await prisma.session.findFirst({
    where: {
      token: session,
    },
    select: {
      token: true,
      userId: true,
      expires: true,
    }
  })
  const user = await prisma.user.findUnique({
    where: {
      id: sess?.userId
    },
    select: {
      id: true,
      username: true,
      email: true,
    }
  })
  return { session: sess, user: user }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const sess = JSON.parse(req.body)
  if (!sess) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const { session, user } = await getSession2User(sess)
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  res.status(200).json({ session: session, user: user })
}
