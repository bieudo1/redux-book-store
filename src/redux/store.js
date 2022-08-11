import {configureStore} from '@reduxjs/toolkit';
import bookListSlice from '../components/BookList/bookSlice';
import readingSlice from '../components/ReadingList/readingSlice';


const store = configureStore({
    reducer:{
        book: bookListSlice,
        reading: readingSlice.reducer
    },
});

export default store;