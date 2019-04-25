import {AdType} from '../App';


export const addItem = (ad: AdType) => ({
  type: 'ADD_ITEM',
  ...ad
});

export const updateItem = (ad: AdType) => ({
  type: 'UPDATE_ITEM',
  ...ad
});

export const deleteItem = (id: number) => ({
  type: 'DELETE_ITEM',
  id
});

export const assignAdToAuthor = (adId: number, name: string) => ({
    type: 'ASSIGN_AD',
    adId,
    name
});

export const changePage = (page: number) => ({
    type: 'CHANGE_PAGE',
    page
});
