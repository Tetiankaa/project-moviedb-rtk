import {FC} from 'react';
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import css from './Error.module.css';

interface IProps {
    error:string
}

const AxiosError: FC<IProps> = ({error}) => {
    return (
        <div className={css.Error}>
            <FontAwesomeIcon icon={faCircleExclamation} /> {error}
        </div>
    );
};

export {AxiosError};