import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IResMovie, IResReview, IReview, IVideo} from "../../interfaces";
import {moviesService, reviewService, searchService, videoService} from "../../services";

interface IState {
    movies:IMovie[],
    movie:IMovie,
    totalPages:number,
    total_results:number,
    isLoading:boolean,
    error:string,
    videoKey:string,
    reviews:IReview[]
}
const initialState:IState ={
    movies:[],
    movie:null,
    totalPages:1,
    total_results:null,
    isLoading:null,
    error:null,
    videoKey:null,
    reviews:[]
}
const getAll = createAsyncThunk<IResMovie,{page:string,genreId?:string}>(
        'movieSlice/getAll',

    async ({page,genreId},{rejectWithValue})=>{
            try {
                const {data} = await moviesService.getAll(page,genreId);
                return data;
            }catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
    }
)

const getById = createAsyncThunk<IMovie,{id:number | string}>(
        'movieSlice/getById',
    async ({id},{rejectWithValue})=>{
            try {
                const {data} = await moviesService.getById(id);
                return data;
            }catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data)
            }
                }
)

const searchMovie = createAsyncThunk<IResMovie,{page:string | number,query:string}>(
        'movieSlice/searchMovie',
            async ({page,query},{rejectWithValue})=>{
            try {
                const {data} = await searchService.getAll(query,page);
                return data;
            }catch (e) {
                const error = e as AxiosError;
                return  rejectWithValue(error.response?.data);
            }
            }
)
const getVideoKey = createAsyncThunk<IVideo,{id:number}>(
        'movieSlice/getVideoKey',
            async ({id},{rejectWithValue})=>{
            try {
              const {data} = await videoService.getById(id);
              return data;
            }catch (e) {
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
            }
)

const getReviews = createAsyncThunk<IResReview,{id:number}>(
        'movieSlice/getReviews',
            async ({id},{rejectWithValue})=>{
            try {
                const {data} = await reviewService.getById(id);
                return data;
            }catch (e){
                const error = e as AxiosError;
                return rejectWithValue(error.response?.data);
            }
            }
)
const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers:{
        setMovie:state => {
            state.movie = null;
        },
        setMovies:state => {
            state.movies = [];
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.movie = action.payload;
            })
            .addCase(getVideoKey.fulfilled, (state, action) => {
                const {results} = action.payload;
                state.videoKey = results[0]?.key || null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                const {results} = action.payload;
                state.reviews = results;
            })
            .addMatcher(isFulfilled(getAll,searchMovie), (state, action) => {
                const {results, total_results,total_pages} = action.payload;

                state.movies = results;
                state.totalPages = total_pages<=500 ? total_pages : 500;
                state.total_results = total_results;
            })
            .addMatcher(isPending(getAll,getById,searchMovie,getVideoKey,getReviews),state => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(getAll,getById,searchMovie,getVideoKey,getReviews), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addMatcher(isFulfilled(getAll,getById,searchMovie,getVideoKey,getReviews), state => {
                state.isLoading = false;
                state.error = null;
            })
});

const {reducer:movieReducer, actions} = movieSlice;

const movieActions = {...actions, getAll,getById,searchMovie,getVideoKey,getReviews};

export {
    movieSlice,
    movieActions,
    movieReducer
}