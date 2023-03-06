// ACTIONS
export const ADD_TEAM_DATA = 'ADD_TEAM_DATA'
export const NO_TEAM_DATA = 'NO_TEAM_DATA'
export const TEAM_LOADING_FINISH = 'TEAM_LOADING_FINISH'

// Reducer
export default function TeamDataReducer(state, action) {
  switch (action.type) {
    case ADD_TEAM_DATA:
      return { team_data: action.payload, team_loading: false }
    case NO_TEAM_DATA:
      return { team_data: {}, team_loading: false }
    case TEAM_LOADING_FINISH:
      return { ...state, team_loading: false }
    default:
      return state
  }
}
