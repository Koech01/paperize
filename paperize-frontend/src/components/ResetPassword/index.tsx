import css from '../Login/index.module.css';
import { useEffect, useState } from 'react'; 
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';
import authSuccessLightIcon from '../assets/authSuccessLightIcon.svg';


const ResetPassword = () => {

    const [theme, setTheme] = useState('light'); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm}> 
                <input className={css.authFormInput} required autoComplete="off" placeholder="Enter Password" type="password"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Confirm Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Reset</button>

                <div className={css.authFormMessageParentDiv}> 
                    <div className={`${css.authFormMessageDiv} ${css.authSuccess}`}>
                        <img className={css.authFormSuccessIcon} src={authSuccessLightIcon} alt='auth-message-icon'/> 
                        <p className={css.authFormMessageText}>Successfully created an account.</p>
                    </div> 

                    <div className={`${css.authFormMessageDiv} ${css.authError}`}>
                        <img className={css.authFormSuccessIcon} src={authErrorLightIcon} alt='auth-message-icon'/> 
                        <p className={css.authFormMessageText}>Successfully created an account.</p>
                    </div>
                </div>
            </form> 
        </div>
    );
}

export default ResetPassword;