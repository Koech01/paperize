import css from './index.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import githubUserIcon from '../assets/githubLightIcon.svg';


const Login = () => {
    const [theme, setTheme]    = useState('light');
    const navigate             = useNavigate();
    const redirectToForgotPass = () => {  navigate('/forgot/')  };


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])

    return(
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm}>
                <h2 className={css.authFormHeader}>Log in</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Login</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToForgotPass}>Forgot Password ?</a></div>

                <div className={css.authFormErrorDiv}>
                    <p className={css.authFormErrorText}>Error</p>
                </div> 
            </form> 

            <div className={css.authFooterDiv}> 

                <div className={css.authFooterChildDiv}>
                    <p className={`${css.authFooterText} ${css.authFooterFaintText}`}>By</p> 
                </div>

                <div className={css.authFooterTextDiv}>
                    <p className={`${css.authFooterText} ${css.authFooterName}`}>Robbie</p>
                    <img className={css.authFooterUserIcon} src={githubUserIcon} alt='auth-user-icon'/> 
                </div> 

                <div className={css.authFooterTextDiv}>
                    <p className={`${css.authFooterText} ${css.authFooterName}`}>koech</p>
                    <img className={css.authFooterUserIcon} src={githubUserIcon} alt='auth-user-icon'/> 
                </div> 
            </div>
        </div>
    );
};

export default Login;