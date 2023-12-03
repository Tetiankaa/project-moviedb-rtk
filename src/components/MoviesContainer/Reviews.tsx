import {FC, useEffect} from 'react';
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import css from './Movies.module.css';
import {Review} from "./Review";


interface IProps {
    id:number
}

const Reviews: FC<IProps> = ({id}) => {
        const dispatch = useAppDispatch();

        const {reviews} = useAppSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieActions.getReviews({id}))
    }, [id,dispatch]);

    return (
        <div>
            <p className={css.ReviewsText}><FontAwesomeIcon icon={faComments}/> Reviews</p>

            <div className={css.Line}></div>

            {reviews.length > 0
                ? reviews.map(review=><Review review={review} key={review.id}/>)
                : <h1 className={css.ReviewsErrorText}>There aren't any reviews for this movie yet!</h1>
            }
        </div>
    );
};

export {Reviews};