import { createContext, useContext } from 'react'

const TaskDetailsContext = createContext()

export const useTaskDetails = () => useContext(TaskDetailsContext)

export default function TaskDetailsContextProvider({ children, ...props }) {
  return (
    <TaskDetailsContext.Provider value={{ ...props }}>
      {children}
    </TaskDetailsContext.Provider>
  )
}
