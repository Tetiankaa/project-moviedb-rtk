import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import css from './Movies.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {MoviesListCard} from "./MoviesListCard";
import {Pagination} from "../PaginationContainer";
import {LoadingSpinner} from "../LoadingContainer";

const MoviesList = () => {
    const [query, setQuery] =  useSearchParams({page:"1"})
    const page = query.get('page');

    const dispatch = useAppDispatch();
    const {movies,totalPages,isLoading} = useAppSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieActions.setMovies());
        dispatch(movieActions.getAll({page}))
    }, [page,dispatch]);

    return (
        <div>
            {isLoading && <LoadingSpinner/>}

            <div className={css.Movies}>{movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)}
                <Pagination setQuery={setQuery} totalPages={totalPages} page={page}/>
            </div>

        </div>
    );
};

export {MoviesList};