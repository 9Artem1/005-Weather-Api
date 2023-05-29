import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import weatherSlice from '../types/weatherSlice';
import favoritesSlice from '../types/favoritesSlice';
import weatherForecastSlice from '../types/weatherForecastSlice';


 const store = configureStore({
  reducer: {
    weather: weatherSlice,
    favorites: favoritesSlice,
    forecats: weatherForecastSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store