import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getTeamQuery } from '../utils/firebase'

export default function useGetTeams(teams) {
  const [teamsList, setTeamsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      setIsLoading(true)
      const q = getTeamQuery(teams)
      unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setTeamsList(snapshot.docs.map((item) => item.data()))
        } else {
          setTeamsList([])
        }
      })
    } catch (error) {
      console.log('Getting Teams Error :', error.message)
    } finally {
      setIsLoading(false)
    }

    console.count('Use GetTeams')
    return () => unsub && unsub()
  }, [teams])

  return { teamsList, isLoading }
}
