import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect } from 'react'
import { useTeam } from '../context/TeamContext'
import { db } from '../lib/firebase'
import {
  ADD_TASKS_DATA,
  NO_TASKS_DATA,
  TASKS_LOADING_FINISH,
} from '../reducers/teamReducer'

export default function useGetTasks(teamcode) {
  const { dispatch } = useTeam()

  useEffect(() => {
    let unsub
    if (teamcode) {
      try {
        unsub = onSnapshot(
          query(
            collection(db, 'teams', teamcode, 'tasks'),
            orderBy('updatedAt')
          ),
          (snapshot) => {
            if (!snapshot.empty) {
              dispatch({
                type: ADD_TASKS_DATA,
                payload: snapshot.docs.map((item) => ({
                  ...item.data(),
                  id: item.id,
                })),
              })
            } else {
              dispatch({ type: NO_TASKS_DATA })
            }
          }
        )
      } catch (error) {
        console.log('Getting Tasks Error', error)
      } finally {
        dispatch({ type: TASKS_LOADING_FINISH })
      }
    }

    return () => unsub && unsub()
  }, [teamcode])
}
