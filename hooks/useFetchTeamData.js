import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useTeam } from '../context/TeamContext'
import { db } from '../lib/firebase'
import {
  ADD_TEAM_DATA,
  NO_TEAM_DATA,
  RESET_DATA,
  TEAM_LOADING_FINISH,
} from '../reducers/teamReducer'

export default function useFetchTeamData(teamCode) {
  const { dispatch } = useTeam()

  useEffect(() => {
    let unsub
    try {
      unsub = onSnapshot(doc(db, 'teams', teamCode), (snapshot) => {
        if (snapshot.exists()) {
          dispatch({
            type: ADD_TEAM_DATA,
            payload: { ...snapshot.data(), id: snapshot.id },
          })
        } else {
          dispatch({ type: NO_TEAM_DATA })
        }
      })
    } catch (error) {
      console.log('Fetching Team Data:', error)
      dispatch({ type: TEAM_LOADING_FINISH })
    }

    return () => {
      unsub && unsub()
      dispatch({ type: RESET_DATA })
    }
  }, [teamCode])
}
