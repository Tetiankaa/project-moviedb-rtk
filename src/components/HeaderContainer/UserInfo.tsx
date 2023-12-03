import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";

import lightCss from "./Light.module.css";
import darkCss from "./Dark.module.css";
import {useAppSelector} from "../../hooks";

const UserInfo = () => {

    const {theme} = useAppSelector(state => state.theme);

    const userClass = theme ? lightCss.User : darkCss.User;

    return (
        <div className={userClass}>
            <FontAwesomeIcon icon={faCircleUser}/>
            <p>Site_User_123</p>
        </div>
    );
};

export {UserInfo};