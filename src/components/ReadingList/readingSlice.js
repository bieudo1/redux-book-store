import {  createSlice } from '@reduxjs/toolkit';
import api from '../../apiService';
import { toast } from "react-toastify";

const readingSlice = createSlice({
    name: 'reading', 
    initialState: {
        readingList: [],
        loading: false,
    },
    reducers:{
        startLoading(state) {
            state.Loading = true;
          },
        getReadingSuccess(state, action){
            state.Loading = false;
            state.readingList = action.payload;
        }
    }
})
export default readingSlice.reducer;

export const getReadingList = () => async (dispatch) => {
    dispatch(readingSlice.actions.startLoading());
    try{
        const res = await api.get(`/favorites`);
        dispatch(readingSlice.actions.getReadingSuccess(res.data))
    } catch(error){toast(error.message);}
}

export const deleteReading = ({removedBookId}) => async (dispatch) =>{
    dispatch(readingSlice.actions.startLoading());
    try{
        await api.delete(`/favorites/${removedBookId}`);
    } catch(error){toast(error.message);}
}

export const addToReading = ({book}) => async (dispatch) => {
    dispatch(readingSlice.actions.startLoading());
    if(!book) return;
    try {
        await api.post(`/favorites`, book);
          toast.success("The book has been added to the reading list!");
    }catch (error) {
          toast.error(error.message);
    }

}
