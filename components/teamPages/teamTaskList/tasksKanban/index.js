import { useMemo } from 'react'
import useCheckWidth from '../../../../hooks/useCheckWidth'
import KanbanDnD from './kanbanDnD'
import KanbanNoraml from './kanbanNoraml'

export default function TasksKanban({ tasks, loading, teamCode }) {
  const isDnd = useCheckWidth()

  let columns = useMemo(
    () => ({
      idle: tasks.filter((item) => item.status === 'idle'),
      working: tasks.filter((item) => item.status === 'working'),
      complete: tasks.filter((item) => item.status === 'complete'),
    }),
    [tasks]
  )

  if (isDnd) {
    return <KanbanDnD columns={columns} teamCode={teamCode} />
  }
  return <KanbanNoraml columns={columns} loading={loading} />
}
