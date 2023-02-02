import { useState, useEffect } from 'react'

export type User = {
  id: string
  email: string
  username: string
}
export type Session = {
  token: string
  userId: string
  expires?: Date
}
export type Data = {
  user: User
  session: Session
}

export type SessionHookResponse = {
  data: Data | null
  loading: boolean
}


export function useSession(): SessionHookResponse {

  const [session, setSession] = useState<any | null>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async (session: string) => {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        body: JSON.stringify(session),
      })
      const result = await res.json()
      setSession(() => ({ user: result.user, session: result.session }))
    }
    const ses = JSON.parse(localStorage.getItem('session') as string)
    if (ses) {
      console.log('session', session)
      fetchUser(ses)
    } else {
      setSession(null)
    }
    return () => {
      setLoading(false)
    }
  }, [])

  const result = { data: session, loading }
  return result
}
