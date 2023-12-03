import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

import css from "../MoviesContainer/Movies.module.css";

const LoadingSpinner = () => {

    return (
        <div className={css.FullPageOverlay}>
            <div className={css.Spinner}>
                <FontAwesomeIcon icon={faSpinner} spin size={'2xl'} />
            </div>
        </div>
    );
};

export {LoadingSpinner};