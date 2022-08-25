import { createSlice } from '@reduxjs/toolkit';
import api from '../../apiService';
import { toast } from "react-toastify";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;



const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        loading: false,
        errorMessage: null,
        bookList:[],
        book:[],

    },
    reducers:{
        startLoading(state) {
            state.loading = true;
          },
        getBookListSuccess(state, action){
            state.loading = false;
            state.bookList = action.payload;
        },
        getBookSuccess(state, action){
            state.loading = false;
            const {imageLink} = action.payload;
            state.book = action.payload;
            state.book.imageLink = `${BACKEND_API}/${imageLink}`
        }
    },
})

export default bookListSlice.reducer;

export const getBookList = ({pageNum, limit,query}) => async (dispatch) => {
    dispatch(bookListSlice.actions.startLoading());
    try{
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        dispatch(bookListSlice.actions.getBookListSuccess(res.data))
    } catch(error){toast.error(error.message);}
}

export const getBook = ({bookId}) => async (dispatch) => {
    dispatch(bookListSlice.actions.startLoading());
    try {
        let url = `/books/${bookId}`;
       const res = await api.get(url);
        dispatch(bookListSlice.actions.getBookSuccess(res.data))
    } catch(error){toast.error(error.message);}
}

