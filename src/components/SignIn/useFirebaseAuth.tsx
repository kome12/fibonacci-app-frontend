import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import fb from '../../utils/firebase'

export const useFirebaseAuth = () => {
  const history = useHistory()

  const logout = useCallback(async () => {
    await fb.auth().signOut()
    history.push('/')
  }, [])

  // Listen to the Firebase Auth state and set user global state
  useEffect(() => {
    const unregisterAuthObserver = fb.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log({ user })
      }
    })

    // Make sure we un-register Firebase observers when the component unmounts
    return () => unregisterAuthObserver()
  }, [])

  return { logout } as const
}
