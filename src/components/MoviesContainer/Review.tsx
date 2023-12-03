import {FC} from 'react';

import {IReview} from "../../interfaces";
import css from './Movies.module.css';

interface IProps {
    review:IReview
}

const Review: FC<IProps> = ({review}) => {
    const {content,author,created_at} = review;

    const dateObject = new Date(created_at);

    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    return (
        <div className={css.Review}>
            <p className={css.Author}>{author}</p>
            <p className={css.Date}>{date} {time}</p>
            <p className={css.Content}>{content}</p>
        </div>
    );
};

export {Review};