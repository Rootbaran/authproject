import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"
const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    }
  })
  return users
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await getUsers()
  res.status(200).json({ status_code: 200, data: users })
}