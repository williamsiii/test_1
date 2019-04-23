const adReds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'UPDATE_ITEM':
        return state
      // return state.map(todo =>
      //   (todo.id === action.id)
      //     ? {...todo, completed: !todo.completed}
      //     : todo
      // )
    case 'DELETE_ITEM':
        return state
        // return state.map(todo =>
      //   (todo.id === action.id)
      //     ? {...todo, completed: !todo.completed}
      //     : todo
      // )
    default:
      return state
  }
}

export default adReds
