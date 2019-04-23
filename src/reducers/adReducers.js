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
      ];
    case 'UPDATE_ITEM':
        return state.map(ad =>
            (ad.id === action.ad.id) ? action.ad : ad
        );
    case 'DELETE_ITEM':
        return state.filter(ad => (ad.id !== action.id));
    default:
      return state
  }
};

export default adReds
