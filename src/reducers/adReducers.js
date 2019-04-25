const adReds = (state = {adsList: []}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.adsList.push({
          id: action.id,
          text: action.text,
          completed: false
        });
    case 'UPDATE_ITEM':
        return {adsList: state.adsList.map(ad =>
            (ad.id === action.ad.id) ? action.ad : ad
        )};
    case 'DELETE_ITEM':
        return {adsList: state.adsList.filter(ad => (ad.id !== action.id))};
    case 'ASSIGN_AD':
        return {adsList: state.adsList.map(ad => 
            (ad.id !== action.adId) ? ad :
                ({...ad, name: action.name})
        )};
    default:
      return state
  }
};

export default adReds
