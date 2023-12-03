import {configureStore} from "@reduxjs/toolkit";

import {genreReducer, movieReducer, posterReducer, themeReducer} from "./slices";

const store = configureStore({
    reducer:{
        movie:movieReducer,
        poster:posterReducer,
        genre:genreReducer,
        theme:themeReducer
    }
});

export {
    store
}