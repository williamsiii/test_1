const adReds = (state = {adsList: []}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
          return state.adsList.push({
              id: action.id,
              text: action.text,
              completed: false
            });
        case 'UPDATE_ITEM':
            return {
                ...state,
                adsList: state.adsList.map(ad =>
                    (ad.id === action.ad.id) ? action.ad : ad)
              };
        case 'DELETE_ITEM':
            return {
                ...state,
                adsList: state.adsList.filter(ad => (ad.id !== action.id))
            };
        case 'ASSIGN_AD':
            return {
                ...state,
                adsList: state.adsList.map(ad => 
                    (ad.id !== action.adId) ? ad :
                        ({...ad, name: action.name}))
            };
        case 'CHANGE_PAGE':
            let page = action.page;
            if (page < 0) page = 0;
            if (page > state.totalPages - 1) page = state.totalPages - 1;

            return {
                ...state,
                page
            };
        default:
            return state
    }
};

export default adReds
