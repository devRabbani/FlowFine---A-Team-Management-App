import { createContext, useContext, useReducer } from 'react'
import TeamReducer from '../reducers/teamReducer'
import { checkAccess } from '../utils/firebase'
import { useUser } from './UserContext'

const TeamContext = createContext()

export const useTeam = () => useContext(TeamContext)

const INITIAL = {
  team_data: {},
  team_loading: true,
  tasks_data: [],
  tasks_loading: true,
}

export default function TeamContextProvider({ children }) {
  const [state, dispatch] = useReducer(TeamReducer, INITIAL)
  return (
    <TeamContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeamContext.Provider>
  )
}
