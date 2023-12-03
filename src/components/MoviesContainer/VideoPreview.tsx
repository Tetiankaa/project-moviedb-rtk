import {FC, useEffect} from 'react';
import YouTube from "react-youtube";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import css from './Movies.module.css';


interface IProps {
    id:number
}

const VideoPreview: FC<IProps> = ({id}) => {

    const dispatch = useAppDispatch();

    const {videoKey} = useAppSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieActions.getVideoKey({id}))
    }, [id, dispatch]);

    return (
        <div>
            {
                videoKey
                    ? <YouTube videoId={videoKey} opts={{height: '420', width: '940'}}/>
                    : <p className={css.ErrorText}><span>Trailer is not available...</span></p>
            }
        </div>
    );
}
export {
    VideoPreview
}