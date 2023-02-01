import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"
const getUser = async (id: string) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      isAdmin: {
        set: true
      }
    },
  })
  console.log(user)
  return user
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  const body = req.body
  if (!body) {
    res.status(400).json({ message: 'Bad request' })
    return
  }
  const { id } = JSON.parse(body)
  if (!id) {
    res.status(400).json({ message: 'Bad request' })
    return
  }
  const updatedUser = await getUser(id)
  res.status(200).json({ status_code: 200, data: updatedUser })
}