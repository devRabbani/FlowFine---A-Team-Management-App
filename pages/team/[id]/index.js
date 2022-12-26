import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../../context/AuthContext'
import TeamHeader from '../../../components/teamHeader'
import TeamTaskList from '../../../components/teamTaskList'
import { getMembers, getTeam } from '../../../utils/firebase'
import useDataDoc from '../../../hooks/useDataDoc'

export default function TeamPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useDataDoc('teams/' + id)
  const { name, updated, owner } = data

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <>
      <TeamHeader name={name} code={id} updated={updated} />
      <TeamTaskList teamCode={id} subgroup={[]} tasks={[]} isLoading={false} />
    </>
  )
}
