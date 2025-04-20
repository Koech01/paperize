import css from './index.module.css'; 
import { useEffect, useState } from 'react'; 


const Notfound = () => {
    
    const [theme, setTheme]    = useState('light'); 

    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])

    return(
        <div className={`${css.notFoundParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}></div>
    );
}

export default Notfound;