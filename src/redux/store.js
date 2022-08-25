import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookListSlice from '../components/BookList/bookSlice';
import readingSlice from '../components/ReadingList/readingSlice';



const rootReducer = combineReducers({
    book: bookListSlice,
    reading: readingSlice
  });

  const store = configureStore({
    reducer: rootReducer,
  });

export default store;