import {useEffect} from "react";

import lightCss from "./Light.module.css";
import darkCss from "./Dark.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {themeActions} from "../../redux";



const ThemeSwitcher= () => {

    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        dispatch(themeActions.setTheme(savedTheme === 'light'))
    }, [dispatch,theme]);

    const containerClass = theme ? lightCss.Container : darkCss.Container;
    const switchClass = theme ? lightCss.Switch : darkCss.Switch;
    const sliderClass = theme ? lightCss.Slider : darkCss.Slider;
    const sunClass = theme ? lightCss.Sun : darkCss.Sun;
    const moonClass = theme ? lightCss.Moon : darkCss.Moon;

    return (
        <div className={containerClass}>

            <span className={sunClass}>☀︎</span>

            <div className={switchClass}>
                <label className={sliderClass}>
                    <input type="checkbox" onChange={()=> {
                        const newTheme = !theme;
                        localStorage.setItem('theme', theme ? 'dark' : 'light');
                        dispatch(themeActions.setTheme(newTheme));
                    }
                    }/>
                </label>
            </div>

            <span className={moonClass}>☽</span>
        </div>
    );
};

export {ThemeSwitcher};