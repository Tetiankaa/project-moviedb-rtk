import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IResPoster} from "../../interfaces";
import {posterService} from "../../services";

interface IState {
    secure_base_url:string,
    error:string
}
const initialState:IState = {
    secure_base_url:null,
    error:null
}

const getBaseUrl = createAsyncThunk<IResPoster,void>(
    'posterSlice/getBaseUrl',
            async (_,{rejectWithValue})=>{
                try {
                    const {data} = await posterService.getBaseUrl();
                    return data;
                }catch (e) {
                    const error = e as AxiosError;
                    return rejectWithValue(error.response?.data);
                }
            }
)
const posterSlice = createSlice({
    name:'posterSlice',
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getBaseUrl.fulfilled, (state, action) => {
                const {images:{secure_base_url}} = action.payload;
                state.secure_base_url = secure_base_url;
                state.error = null;
            })
            .addCase(getBaseUrl.rejected, (state, action) => {
                state.error = action.payload as string;
            })
});

const {reducer:posterReducer, actions} = posterSlice;

const posterActions = {...actions,getBaseUrl};

export {
    posterSlice,
    posterActions,
    posterReducer
}