import {useParams, useSearchParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import css from "./Movies.module.css";
import {MoviesListCard} from "./MoviesListCard";
import {Pagination} from "../PaginationContainer";
import {LoadingSpinner} from "../LoadingContainer";

const MoviesByGenre = () => {
    const {id} = useParams();

    const dispatch = useAppDispatch();

    const {isLoading, movies, totalPages} = useAppSelector(state => state.movie);
    const {selectedGenre} = useAppSelector(state => state.genre);

    const [query, setQuery] =  useSearchParams({page:"1"})
    const page:string = query.get('page');

    useEffect(() => {
        if (id !== undefined){
            dispatch(movieActions.setMovies());
            dispatch(movieActions.getAll({page,genreId:id}))
        }
    }, [id,page,dispatch]);

    return (
        <>
            {isLoading && <LoadingSpinner/>}

            <div className={css.GenreHeader}><h1><FontAwesomeIcon icon={faFilm}/> {selectedGenre}</h1></div>

            <div className={css.Movies} style={{marginTop:20}}>
                {movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)}
            </div>

            <div>
                <Pagination setQuery={setQuery} page={page} totalPages={totalPages}/>
            </div>

        </>
    );
};

export {MoviesByGenre};