import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import RouteHelper from '../../../components/routeHelper'
import useLiveData from '../../../hooks/useLiveData'
import TeamHeader from '../../../components/teamHeader'
import TeamTaskList from '../../../components/teamTaskList'
import { getMembers, getTeam } from '../../../utils/firebase'

export default function TeamPage() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const [members, setMembers] = useState([])
  const [teamData, setTeamData] = useState()
  const [teamLoading, setTeamLoading] = useState(true)

  // const { data, isLoading } = useTaskList(id)
  const { data: tasks, isLoading } = useLiveData(`teams/${id}/tasks`, true)
  // const { data: teamData, isLoading: teamIsLoading } = useLiveData(
  //   `teams/${id}`
  // )

  useEffect(() => {
    const handleData = async () => {
      const res = await getMembers(id)
      console.log('memem', res, user?.uid, id)
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
        const res = await getTeam(id)
        if (res) {
          setTeamData(res)
          setTeamLoading(false)
        } else {
          throw new Error('SOmething went wrong try to reload the page')
        }
      } catch (error) {
        console.log(error.message)
        setTeamLoading(false)
        toast.error(<b>Error getting Team Info, Try Again!</b>)
      }
    }
    handleData()
  }, [id])

  return (
    <>
      <RouteHelper teamcode={id} type="team" />
      <TeamHeader name={teamData?.teamName} code={id} isLoading={teamLoading} />
      <TeamTaskList
        teamCode={id}
        subgroup={teamData?.subgroup}
        tasks={tasks}
        isLoading={isLoading}
      />
    </>
  )
}
