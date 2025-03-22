import css from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react'; 
import githubLightIcon from '../assets/githubLightIcon.svg';
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';


const Login = () => {

    const [theme, setTheme]       = useState('light');
    const navigate                = useNavigate();
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');
    const [redirect, setRedirect] = useState(false);
    const redirectToForgotPass    = () => {  navigate('/forgot/')  };


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    useEffect(() => { if (redirect) { navigate('/') } }, [redirect])


    const submit = async(e : SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('', {
                method      : 'POST',
                headers     : { 'Content-Type': 'application/json' },
                credentials : 'include',
                body        : JSON.stringify({ email, password })
            })

            if (response.ok) {
                setRedirect(true);
            }

            else {
                const data = await response.json();
                setError(data.detail);
            }
        }

        catch (error) {
            setError('An error occurred. Please try again.')
        }
    }


    return(
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm} onSubmit={submit}>
                <h2 className={css.authFormHeader}>Log in</h2>
                <input 
                    required 
                    autoComplete = "off" 
                    placeholder  = "Email" 
                    type         = "email"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setEmail(e.target.value)}
                />

                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Password" 
                    type         = "password"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setPassword(e.target.value)}
                />
                
                <button className={css.authFormBtn} type="submit">Login</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToForgotPass}>Forgot Password ?</a></div>

                {error && (
                    <div className={css.authFormMessageParentDiv}> 
                        <div className={`${css.authFormMessageDiv} ${css.authError}`}>
                            <img className={css.authFormSuccessIcon} src={authErrorLightIcon} alt='auth-message-icon'/> 
                            <p className={css.authFormMessageText}>{error}</p>
                        </div>
                    </div>
                )}
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