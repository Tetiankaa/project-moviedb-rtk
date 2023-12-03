import {createAsyncThunk, createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre, IResGenre} from "../../interfaces";
import {genreService} from "../../services";


interface IState {
    genres:IGenre[],
    selectedGenre:string,
    error:string,
    isLoading:boolean
}
const initialState:IState = {
    genres:[],
    selectedGenre:null,
    error:null,
    isLoading:null
}

const getAll = createAsyncThunk<IResGenre,void>(
    'genreSlice/getAll',
            async (_,{rejectWithValue})=>{
        try {
            const {data} = await genreService.getAll();
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue((error.response?.data))
        }
            }
)
const genreSlice = createSlice({
    name:'genreSlice',
    initialState,
    reducers:{
        setSelectedGenre:(state, action) => {
            state.selectedGenre = action.payload;
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload.genres;
                state.isLoading = false;
                state.error = null;
            })
            .addMatcher(isPending(getAll), state => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(getAll), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
})

const {reducer:genreReducer, actions} = genreSlice;

const genreActions = {...actions, getAll};

export {
    genreSlice,
    genreActions,
    genreReducer
}