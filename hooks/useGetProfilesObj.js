import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { getProfilesQuery } from '../utils/firebase'

export default function useGetProfilesObj(usernames) {
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const q = getProfilesQuery(usernames)
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          const profilesObj = snapshot.docs.reduce((prev, current) => {
            const data = current.data()
            return {
              ...prev,
              [data?.username]: data,
            }
          }, {})
          setProfiles(profilesObj)
        } else {
          setProfiles({})
        }
      } catch (error) {
        console.log('Getting Profiles Object', error)
      } finally {
        setLoading(false)
      }
    }
    if (usernames?.length) {
      handleFetch()
    }
  }, [usernames])
  return { profiles, loading }
}
