// export const simpleAction = () => dispatch => {
//     dispatch({
//         type: 'SIMPLE_ACTION',
//             payload: 'result_of_simple_action'
//     })
// }

let nextId = 0;

export const addItem = text => ({
  type: 'ADD_ITEM',
  id: nextId++,
  text
})