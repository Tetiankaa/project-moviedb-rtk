import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import css from './Movies.module.css';
import {StarsRating} from "./StarsRating";
import {PosterPreview} from "./PosterPreview";
import {useAppSelector} from "../../hooks";

interface IProps {
    movie:IMovie
}

const MoviesListCard: FC<IProps> = ({movie}) => {
    const {original_title,poster_path,vote_average,id} = movie;

    const {theme} = useAppSelector(state => state.theme);

    const navigate = useNavigate();

    return (
        <div className={css.MovieContainer}>
            <div className={css.Movie} onClick={()=>navigate(`/movies/${id}`)}>

                <PosterPreview original_title={original_title} poster_path={poster_path} size={`185`}/>
                <p style={theme ? {color:"darkblue"} :{color:"white"}}>{original_title}</p>
                <StarsRating vote_average={vote_average} size={22} color={theme ? '#FF7700' : '#f1a545'}/>

            </div>
        </div>
    );
};

export {MoviesListCard};