// ACTIONS
export const ADD_DATA = 'ADD_DATA'
export const NO_DATA = 'NO_DATA'
export const LOADING_FINISH = 'LOADING_FINISH'

// Reducer
export default function TeamDataReducer(state, action) {
  switch (action.type) {
    case ADD_DATA:
      return { data: action.payload, loading: false }
    case NO_DATA:
      return { data: {}, loading: false }
    case LOADING_FINISH:
      return { ...state, loading: false }
    default:
      return state
  }
}
