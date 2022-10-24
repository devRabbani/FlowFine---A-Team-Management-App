import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RouteHelper from '../../components/routeHelper'
import TeamHeader from '../../components/teamHeader'
import TeamTaskList from '../../components/teamTaskList'
import { useAuth } from '../../context/AuthContext'
import useLiveData from '../../hooks/useLiveData'
import { checkUser, getMembers } from '../../utils/firebase'

export default function TeamPage() {
  const router = useRouter()
  const { id, name } = router.query
  const { user } = useAuth()
  const [members, setMembers] = useState([])
  const []
  // const { data, isLoading } = useTaskList(id)
  const { data, isLoading } = useLiveData(`teams/${id}/tasks`, true)

  useEffect(() => {
    const handleData = async () => {
      const res = await getMembers(user?.uid, id)
      if (res) {
        setMembers(res)
        const isAuth = res.map((item) => {
          if (item.uid === user?.uid) {
            return true
          }
        })

        if (!isAuth) {
          router.push('/')
        }
      }
    }
    handleData()
  }, [user?.uid, id])


  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await getTeam(teamCode)
        if (res) {
        } else {
          throw new Error('SOmething went wrong try to reload the page')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [])

  return (
    <>
      <RouteHelper teamcode={id} type="team" />
      <TeamHeader teamCode={id} teamName={name} />
      <TeamTaskList
        teamCode={id}
        members={members}
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
