import css from '../Login/index.module.css';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react'; 
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';
import authSuccessLightIcon from '../assets/authSuccessLightIcon.svg';


const ResetPassword = () => {
    const navigate     = useNavigate();
    const [theme, setTheme] = useState('light'); 
    const [error, setError] = useState('');
    const [pass, setPass]  = useState('');
    const [redirect, setRedirect] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    const submit = async(e : SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('', {
                method : 'POST',
                headers : {},
                credentials : 'include',
                body : JSON.stringify({ pass, confirmPass })
            })

            if (response.ok) {
                setRedirect(true);
            }

            else {
                const data = await response.json()
                setError(data.detail);
            }
        }

        catch (error) { setError('An error occurred. Please try again.') }
    }


    useEffect(() => { if (redirect) { navigate('/') } }, [redirect])


    return(
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm} onSubmit={submit}> 
                
                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Enter Password" 
                    type         = "password"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setPass(e.target.value)}
                />

                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Confirm Password" 
                    type         = "password"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setConfirmPass(e.target.value)}
                />

                <button className={css.authFormBtn} type="submit">Reset</button>


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

export default ResetPassword;