import css from './index.module.css'; 
import { useEffect, useState } from 'react'; 


const Setting = () => {

    const [theme, setTheme] = useState('light'); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={css.settingParentDiv}>
            <h1>Setting</h1>
        </div>
    );
}

export default Setting;