import { useCallback, useEffect } from 'react'
import { SignIn } from '.'
import fb from '../../utils/firebase'

export const useFirebaseAuth = () => {
  const renderSignIn = useCallback(() => {
    return <SignIn />
  }, [])

  const logout = useCallback(() => {
    fb.auth().signOut()
  }, [])

  useEffect(() => {
    const unsubscribe = fb.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        console.log({ user }) // ユーザー情報が表示される
      }

      unsubscribe()
    })
  }, [])

  return { renderSignIn, logout } as const
}
