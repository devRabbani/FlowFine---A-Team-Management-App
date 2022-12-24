import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getTeamQuery } from '../utils/firebase'

export default function useGetTeams(teams, loading) {
  const [teamsList, setTeamsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      setIsLoading(true)
      let unsub
      try {
        const q = getTeamQuery(teams)
        unsub = onSnapshot(q, (snapshot) => {
          console.log(snapshot, 'snapshot')
          if (!snapshot.empty) {
            setTeamsList(snapshot.docs.map((item) => item.data()))
          } else {
            setTeamsList([])
          }
          setIsLoading(false)
        })
      } catch (error) {
        console.log(error.message)
        setIsLoading(false)
      }

      console.count('Use GetTeams')
      return () => unsub && unsub()
    }
  }, [loading, teams])

  return { teamsList, isLoading }
}
