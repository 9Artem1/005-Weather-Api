import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { FavoriteCity } from '../types/FavoriteCity';

const STORAGE_KEY = 'favorites';

export const saveFavoritesToStorage = (favorites: FavoriteCities) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const getFavoritesFromStorage = (): FavoriteCities => {
    const favoritesJSON = localStorage.getItem(STORAGE_KEY);
    if (favoritesJSON) {
        return JSON.parse(favoritesJSON);
    }
    return [];
};

export const deleteFavoritesFromStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

type FavoriteCities = FavoriteCity[];

interface InitialState {
  favoriteCities: FavoriteCities;
}

const initialState: InitialState = {
  favoriteCities: getFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { payload } = action;
      const foundCity = state.favoriteCities.find(city => {
        console.log('city.city', city.city)
        console.log('payload.city', payload.city)
        return city.city.toLowerCase() === payload.city.toLowerCase()});
      if (!foundCity) {
        const newFavoriteCity = {
          ...payload,
          id: uuidv4(),
        };
        state.favoriteCities.push(newFavoriteCity);
      } else {
        const index = state.favoriteCities.findIndex(city => city.id === foundCity.id);
        state.favoriteCities[index] = {
          ...payload,
          id: foundCity.id,
        };
      }
      saveFavoritesToStorage(state.favoriteCities);
    },
    removeFavorite: (state, action) => {
      const index = state.favoriteCities.findIndex(city => city.id === action.payload);
      if (index !== -1) {
        state.favoriteCities.splice(index, 1);
        saveFavoritesToStorage(state.favoriteCities);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;