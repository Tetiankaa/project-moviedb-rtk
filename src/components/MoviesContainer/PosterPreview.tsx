import {FC, useEffect} from 'react';

import no_image from '../../assets/images/No-Image-Placeholder.svg.png';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {posterActions} from "../../redux";

interface IProps {
    original_title:string,
    poster_path:string,
    size:string
}

const PosterPreview: FC<IProps> = ({poster_path,original_title,size}) => {

        const dispatch = useAppDispatch();

        const {secure_base_url} = useAppSelector(state => state.poster);

    useEffect(() => {
        dispatch(posterActions.getBaseUrl())
    }, [dispatch]);

    const imageUrl = `${secure_base_url}${'w'+size}${poster_path}`;

    const isPoster = (poster_path:string) =>{
        if (poster_path){
            return <img src={imageUrl} alt={original_title} style={{borderRadius:10}}/>
        }else {
            return <img src={no_image} alt={'not available'} style={{borderRadius:10,width:+`${size}`}}/>
        }
    }

    return isPoster(poster_path);
};

export {PosterPreview};