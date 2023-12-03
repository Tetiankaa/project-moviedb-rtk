import { useNavigate} from "react-router-dom";

import css from './Error.module.css';


const Error = () => {
    const navigate = useNavigate();

    return (
        <div className={css.Background}>
           <button onClick={()=>navigate(-1)} className={css.Button}>Go back</button>
        </div>
    );
};

export {Error};