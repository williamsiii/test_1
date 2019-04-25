import {AdType} from '../App';
import {IStoreState} from '../store';


const adReds = (state: IStoreState | any, action: any) => {
    switch (action.type) {
        case 'ADD_ITEM':
            state.adsList.push(action.ads as AdType);
            return state;
        case 'UPDATE_ITEM':
            return {
                ...state,
                adsList: state.adsList.map((ad: AdType) =>
                    (ad.id === action.ad.id) ? action.ad : ad)
              };
        case 'DELETE_ITEM':
            return {
                ...state,
                adsList: state.adsList.filter((ad: AdType) => (ad.id !== action.id))
            };
        case 'ASSIGN_AD':
            return {
                ...state,
                adsList: state.adsList.map((ad: AdType) =>
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
