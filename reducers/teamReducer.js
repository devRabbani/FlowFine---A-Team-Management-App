// ACTIONS
export const ADD_TEAM_DATA = 'ADD_TEAM_DATA'
export const NO_TEAM_DATA = 'NO_TEAM_DATA'
export const TEAM_LOADING_FINISH = 'TEAM_LOADING_FINISH'
export const ADD_TASKS_DATA = 'ADD_TASKS_DATA'
export const NO_TASKS_DATA = 'NO_TASKS_DATA'
export const TASKS_LOADING_FINISH = 'TASKS_LOADING_FINISH'
export const RESET_DATA = 'RESET_DATA'

// Reducer
export default function TeamDataReducer(state, action) {
  switch (action.type) {
    case ADD_TEAM_DATA:
      return { ...state, team_data: action.payload, team_loading: false }
    case NO_TEAM_DATA:
      return { ...state, team_data: {}, team_loading: false }
    case TEAM_LOADING_FINISH:
      return { ...state, team_loading: false }
    case ADD_TASKS_DATA:
      return { ...state, tasks_data: action.payload, tasks_loading: false }
    case NO_TASKS_DATA:
      return { ...state, tasks_data: [], tasks_loading: false }
    case TASKS_LOADING_FINISH:
      return { ...state, tasks_loading: false }
    case RESET_DATA:
      return {
        team_data: {},
        team_loading: true,
        tasks_data: [],
        tasks_loading: true,
      }
    default:
      return state
  }
}
