export const addItem = ad => ({
  type: 'ADD_ITEM',
  ...ad
});

export const updateItem = ad => ({
  type: 'UPDATE_ITEM',
  ...ad
});

export const deleteItem = id => ({
  type: 'DELETE_ITEM',
  id: id
});