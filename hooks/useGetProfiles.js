import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getProfilesQuery } from '../utils/firebase/common'

export default function useGetProfiles(usernames) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      if (usernames?.length) {
        const q = getProfilesQuery(usernames)

        unsub = onSnapshot(q, (snapshot) => {
          console.count('UseEffect useProfiles')
          if (!snapshot.empty) {
            setProfiles(snapshot.docs.map((item) => item.data()))
          } else {
            setProfiles([])
          }
          setLoading(false)
        })
      }
    } catch (error) {
      console.log('Get Profiles', error)
      setLoading(false)
    }

    return () => unsub && unsub()
  }, [usernames])

  return { profiles, loading }
}
