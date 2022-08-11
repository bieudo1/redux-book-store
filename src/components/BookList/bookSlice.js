import { createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from "react-router-dom";
import api from '../../apiService';



const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        loading: false,
        errorMessage: null,
        book:[],
        bookList:[],
    },
    reducers:{
        getBooksSuccess(state, action){
            state.bookList = action.payload;
        },
        getBookSuccess(state, action){
            state.book = action.payload;
        }
    },
})

export const getBookList = ({pageNum, limit,query}) => async (dispatch) => {
    try{
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        dispatch(bookListSlice.actions.getBooksSuccess(res.data))
    } catch(err){}
}

export const getBook = ({bookId}) => async (dispatch) => {
    try {

        let url = `/books/${bookId}`;
       const res = await api.get(url);
        dispatch(bookListSlice.actions.getBookSuccess(res.data))
    } catch(err){}
}

export default bookListSlice.reducer;