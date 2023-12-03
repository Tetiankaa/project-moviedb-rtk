import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {GenreBadge} from "./GenreBadge";
import genreCss from './Genre.module.css';
import {LoadingSpinner} from "../LoadingContainer";


const Genres = () => {

    const dispatch = useAppDispatch();

    const {genres,isLoading} = useAppSelector(state => state.genre);

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);
    
    return (
            <div>
                {isLoading && <LoadingSpinner/>}

                <div className={genreCss.Block}>

                    <div className={genreCss.Genres}>
                        {genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
                    </div>

                </div>

            </div>

    );
};

export {Genres};