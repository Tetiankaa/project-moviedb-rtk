import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import css from './Movies.module.css';
import {PosterPreview} from "./PosterPreview";
import {StarsRating} from "./StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {VideoPreview} from "./VideoPreview";
import {Reviews} from "./Reviews";

interface IProps {
    movie:IMovie
}

const MovieInfo: FC<IProps> = ({movie}) => {
    const {original_title,poster_path,budget, genres,production_countries,runtime,vote_average,vote_count,overview,release_date,id} = movie;

    const country = production_countries.length>0 ? production_countries[0].name : '';

    const isBudget = budget > 0 ? budget : '';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {theme} = useAppSelector(state => state.theme);

    const moviesByGenre = (genreId:number,genreName:string) =>{
        navigate(`/genres/${genreId}`);
        dispatch(genreActions.setSelectedGenre(genreName))
    }

    return (
        <>
           <div className={theme ? css.MovieInfoContainerLight : css.MovieInfoContainerDark}>
               <div className={css.InnerContainer}>

                   <div className={css.Poster}>
                       <PosterPreview original_title={original_title} poster_path={poster_path} size={'342'}/>

                       <div className={css.StarsRating}>
                           <StarsRating vote_average={vote_average} size={45}/>
                           <p>{vote_count} votes</p>
                       </div>
                   </div>

                   <div className={css.MovieInfo}>
                       <p className={css.OriginalTitle}>{original_title}</p>
                       <p className={css.Info}><i>Release date: </i>{release_date}</p>

                       {
                           country
                           ? <p className={css.Info}><i>Country: </i>{country}</p>
                           : ''
                       }

                       {
                           isBudget
                               ? <p className={css.Info}><i>Budget:</i> {budget}$</p>
                               : ''
                       }
                        <p className={css.Genre}><i>Genre: </i>{genres.map((genre,index)=><span key={genre.id} onClick={()=>moviesByGenre(genre.id,genre.name)}>{genre.name}{index !== genres.length-1 && ','}</span>)}</p>

                       <p className={css.Info}><i>Runtime:</i> {runtime} min</p>
                       <p className={css.Info}><i>About:</i> {overview}</p>
                  </div>
               </div>

               <div className={css.VideoReviews}>
                   <div>
                       <VideoPreview id={id}/>
                   </div>

                   <div>
                       <Reviews id={id}/>
                   </div>

               </div>

           </div>
        </>
    );
};

export {MovieInfo};