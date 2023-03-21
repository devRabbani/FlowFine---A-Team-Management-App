import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getTeamQuery } from '../utils/firebase/common'

export default function useGetTeams(teams) {
  const [teamsList, setTeamsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      if (!teams?.length) {
        setTeamsList([])
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      const q = getTeamQuery(teams)
      unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setTeamsList(snapshot.docs.map((item) => item.data()))
        } else {
          setTeamsList([])
        }
        setIsLoading(false)
      })
    } catch (error) {
      console.log('Getting Teams Error :', error.message)
      setIsLoading(false)
    }

    return () => unsub && unsub()
  }, [teams])

  return { teamsList, isLoading }
}
