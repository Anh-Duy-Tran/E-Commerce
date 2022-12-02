export const reducer = (state, action) => {
  switch (action.type) {
    case "toggle_button":
      return {
        ...state,
        active: !state.active
      }

    default:
      return state
  }
}

export const initialState = {
  user : null,
  menuOpen :
}