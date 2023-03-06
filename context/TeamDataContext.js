import { createContext, useContext, useReducer } from 'react'
import TeamDataReducer from '../reducers/teamDataReducer'

const TeamDataContext = createContext()

export const useTeamData = () => useContext(TeamDataContext)

const INITIAL = {
  data: {},
  loading: true,
}

export default function TeamDataContextProvider({ children }) {
  const [state, dispatch] = useReducer(TeamDataReducer, INITIAL)
  return (
    <TeamDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeamDataContext.Provider>
  )
}
