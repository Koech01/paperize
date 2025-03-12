import css from './index.module.css';
import { useEffect, useState } from 'react'; 


const Profile = () => {

    const [theme, setTheme] = useState('light'); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={`${css.profileParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;