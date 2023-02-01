
export default async function signOut() {
  const b = localStorage.removeItem('session')
  console.log(b)
  return
}