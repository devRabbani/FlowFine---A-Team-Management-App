import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { getRandomTeamQuery } from '../utils/firebase/common'

export default function useGetRandomTeams(teamcodes) {
  const [teamsList, setTeamsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      setIsLoading(true)
      const q = getRandomTeamQuery(teamcodes)
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
  }, [teamcodes])

  return { teamsList, isLoading }
}
