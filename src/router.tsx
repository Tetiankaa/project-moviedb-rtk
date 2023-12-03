import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {ErrorPage, GenresPage, MoviePage, MoviesByGenrePage, MoviesPage, SearchPage} from "./pages";

const router = createBrowserRouter([
    {path:'', element:<MainLayout/>,errorElement:<ErrorPage/> ,children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path:'movies',element:<MoviesPage/>},
            {path:'movies/:id', element:<MoviePage/>},
            {path:'genres',element:<GenresPage/>},
            {path:'genres/:id',element:<MoviesByGenrePage/>},
            {path:'search', element:<SearchPage/>}
        ]}
]);

export {
    router
}