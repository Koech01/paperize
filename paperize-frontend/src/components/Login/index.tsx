import css from './index.module.css';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import githubLightIcon from '../assets/githubLightIcon.svg';
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';
import authSuccessLightIcon from '../assets/authSuccessLightIcon.svg';


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

            <div className={css.authFooterDiv}>  
                <div className={css.authFooterChildDiv}> 

                    <div className={css.authFooterFlexDiv}>
                        <img className={css.authFooterUserIcon} src={githubLightIcon} alt='auth-github-icon'/> 
                        <p className={`${css.authFooterText} ${css.authFooterTitle}`}>Contributors.</p> 
                    </div>

                    <p className={`${css.authFooterText} ${css.authFooterFaintText}`}>
                        Built by us, for you – &nbsp;
                        <a className={css.authFooterLink} href='https://github.com/Koech01' target="_blank" rel="noopener noreferrer">
                        <strong className={css.authFooterGitUsername}>Koech</strong>
                        </a>  
                        &nbsp;&&nbsp; 
                        <a className={css.authFooterLink} href='https://github.com/whoisrobb' target="_blank" rel="noopener noreferrer">
                            <strong className={css.authFooterGitUsername}>Robbie</strong>
                        </a>
                        .  
                    </p>  
                </div>
            </div>
        </div>
    );
};

export default Login;