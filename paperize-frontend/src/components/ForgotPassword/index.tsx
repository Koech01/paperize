import css from '../Login/index.module.css';  
import { useNavigate } from 'react-router-dom'; 
import { SyntheticEvent, useEffect, useState } from 'react';
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';
import authSuccessLightIcon from '../assets/authSuccessLightIcon.svg';


const ForgotPassword = () => {

    const [theme, setTheme]       = useState('light');
    const navigate                = useNavigate();
    const [email, setEmail]       = useState('');
    const [error, setError]       = useState('');
    const [redirect, setRedirect] = useState(false);
    const redirectToLogin         = () => { navigate('/login/') };

    
    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    const submit = async(e : SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('', {
                method      : 'POST',
                headers     : {},
                credentials : 'include',
                body        : JSON.stringify({ email })
            })

            if (response.ok) {
                setRedirect(true);
            }

            else {
                const data = await response.json();
                setError(data.error);
            }
        }

        catch (error) { setError('f') }
    }


    useEffect(() => { if (redirect) { navigate('/') } }, [redirect])


    return(
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm} onSubmit={submit}> 
                
                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Email" 
                    type         = "email"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setEmail(e.target.value)}
                />

                <button className={css.authFormBtn} type="submit">Submit</button>

                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToLogin}>Log In</a></div>
                
                {error && ( 
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
                )}
            </form> 
        </div>
    );
}

export default ForgotPassword;