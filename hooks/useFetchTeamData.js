import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useTeamData } from '../context/TeamDataContext'
import { db } from '../lib/firebase'
import { ADD_DATA, LOADING_FINISH, NO_DATA } from '../reducers/teamDataReducer'

export default function useFetchTeamData(teamCode) {
  const { dispatch } = useTeamData()

  useEffect(() => {
    let unsub
    try {
      unsub = onSnapshot(doc(db, 'teams', teamCode), (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: ADD_DATA, payload: snapshot.data() })
        } else {
          dispatch({ type: NO_DATA })
        }
      })
    } catch (error) {
      console.log('Fetching Team Data:', error)
      dispatch({ type: LOADING_FINISH })
    }

    return () => unsub && unsub()
  }, [teamCode])
}
