import css from '../Login/index.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [theme, setTheme] = useState('light'); 
    const navigate          = useNavigate();
    const redirectToLogin   = () => { navigate('/login/') };


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm}>
                <h2>Create Account</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Username" type="text"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Sign up</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToLogin}>Log In</a></div>

                <div className={css.authFormErrorDiv}>
                    <p className={css.authFormErrorText}>Error</p>
                </div>
            </form> 
        </div>
    );
}

export default SignUp;