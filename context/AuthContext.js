import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { auth } from '../lib/firebase'
import AuthReducer, { AUTHREADY } from '../reducers/authReducer'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

const INITIAL_STATE = {
  user: null,
  authReady: false,
}

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => [
      dispatch({ type: AUTHREADY, payload: authUser }),
    ])
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
